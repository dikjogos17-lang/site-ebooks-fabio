import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'secret-key-change-me-in-production';

app.use(cors());
app.use(express.json());

// Setup multer for uploads
const uploadDir = path.join(__dirname, '..', 'public', 'capas');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'ebook-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage });

// --- AUTH MIDDLEWARE ---
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
};

// --- AUTH ENDPOINTS ---
app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.adminUser.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: 'Credenciais inválidas.' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Credenciais inválidas.' });

    await prisma.adminUser.update({
      where: { id: user.id },
      data: { lastLogin: new Date() }
    });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

app.get('/api/admin/me', authenticate, async (req, res) => {
  try {
    const user = await prisma.adminUser.findUnique({ where: { id: req.user.id } });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });
    res.json({ user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

// --- EBOOKS ENDPOINTS ---
app.get('/api/ebooks', async (req, res) => {
  try {
    const ebooks = await prisma.ebook.findMany({
      include: { category: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(ebooks);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar e-books' });
  }
});

app.get('/api/ebooks/:id', async (req, res) => {
  try {
    const ebook = await prisma.ebook.findUnique({
      where: { id: req.params.id },
      include: { category: true }
    });
    if (!ebook) return res.status(404).json({ error: 'E-book não encontrado' });
    res.json(ebook);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar e-book' });
  }
});

app.post('/api/ebooks', authenticate, async (req, res) => {
  try {
    const ebook = await prisma.ebook.create({ data: req.body });
    res.status(201).json(ebook);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar e-book' });
  }
});

app.put('/api/ebooks/:id', authenticate, async (req, res) => {
  try {
    const ebook = await prisma.ebook.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(ebook);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar e-book' });
  }
});

app.delete('/api/ebooks/:id', authenticate, async (req, res) => {
  try {
    await prisma.ebook.delete({ where: { id: req.params.id } });
    res.json({ message: 'E-book deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar e-book' });
  }
});

// --- CATEGORIES ENDPOINTS ---
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { ebooks: true }
        }
      }
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar categorias' });
  }
});

app.post('/api/categories', authenticate, async (req, res) => {
  try {
    const category = await prisma.category.create({ data: req.body });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar categoria' });
  }
});

app.put('/api/categories/:id', authenticate, async (req, res) => {
  try {
    const category = await prisma.category.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar categoria' });
  }
});

app.delete('/api/categories/:id', authenticate, async (req, res) => {
  try {
    await prisma.category.delete({ where: { id: req.params.id } });
    res.json({ message: 'Categoria deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar categoria' });
  }
});

// --- UPLOAD ENDPOINT ---
app.post('/api/upload', authenticate, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhuma imagem foi enviada.' });
  }
  // Return the public URL for the image
  res.json({ url: `/capas/${req.file.filename}` });
});

// --- IMPORT ENDPOINT ---
app.post('/api/ebooks/import', authenticate, upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Nenhum arquivo enviado.' });

  try {
    const content = fs.readFileSync(req.file.path, 'utf8');
    const lines = content.split('\n');
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    
    let imported = 0;
    
    // We assume columns: title, author, category, description, fullDescription, capa, rating, pages, language, format, publishDate
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      
      const cols = lines[i].split(',').map(c => c.trim());
      const ebookData = {};
      
      headers.forEach((h, idx) => {
        if (cols[idx]) ebookData[h] = cols[idx];
      });

      if (!ebookData.title) continue;

      // Handle category finding/creating
      let categoryId = null;
      if (ebookData.category) {
        const slug = ebookData.category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
        const cat = await prisma.category.upsert({
          where: { slug },
          update: {},
          create: { name: ebookData.category, slug, description: ebookData.category }
        });
        categoryId = cat.id;
      } else {
        const cat = await prisma.category.findFirst();
        categoryId = cat?.id;
      }

      if (!categoryId) continue;

      const slug = ebookData.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\W+/g, '-').substring(0, 100) + '-' + Date.now() + i;

      await prisma.ebook.create({
        data: {
          title: ebookData.title,
          slug,
          author: ebookData.author || 'Desconhecido',
          categoryId,
          description: ebookData.description || '',
          fullDescription: ebookData.fulldescription || ebookData.description || '',
          capa: ebookData.capa || '/capas/ebook-1.jpg',
          rating: Number(ebookData.rating) || 5,
          pages: Number(ebookData.pages) || 10,
          language: ebookData.language || 'Português',
          format: ebookData.format || 'PDF',
          publishDate: ebookData.publishdate || new Date().toISOString().split('T')[0],
        }
      });
      imported++;
    }

    // Delete temp file
    fs.unlinkSync(req.file.path);
    
    res.json({ message: `${imported} e-books importados com sucesso.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao importar CSV' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
