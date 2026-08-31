import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

async function seed() {
  console.log('Seeding data...');

  // 1. Create Admin User
  const passwordHash = await bcrypt.hash('admin123', 10);
  await prisma.adminUser.upsert({
    where: { email: 'admin@ebookstore.com' },
    update: {},
    create: {
      name: 'Administrador',
      email: 'admin@ebookstore.com',
      password: passwordHash
    }
  });
  console.log('Admin user seeded (admin@ebookstore.com / admin123)');

  // 2. Parse ebooks.ts
  const ebooksTsPath = path.join(__dirname, '..', 'src', 'data', 'ebooks.ts');
  const dataContent = fs.readFileSync(ebooksTsPath, 'utf-8');

  // Parse categories
  const catMatch = dataContent.match(/export const categories = (\[[\s\S]*?\]);/);
  let categories = [];
  if (catMatch) {
    categories = eval(`(${catMatch[1]})`);
  } else {
    categories = ['Teologia', 'Bíblia', 'Profecias', 'Escatologia', 'Doutrina', 'História Cristã', 'Estudos Bíblicos', 'Fé Cristã'];
  }

  const categoryMap = {};
  for (const cat of categories) {
    const slug = cat.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
    const createdCat = await prisma.category.upsert({
      where: { slug: slug },
      update: {},
      create: { name: cat, slug: slug, description: cat }
    });
    categoryMap[cat] = createdCat.id;
  }
  console.log(`Seeded ${categories.length} categories.`);

  // Parse ebooks array
  const tsMatch = dataContent.match(/export const ebooks: Ebook\[\] = (\[[\s\S]*\]);/);
  if (tsMatch) {
    let ebooksArrayStr = tsMatch[1];
    const ebooks = eval(`(${ebooksArrayStr})`);

    let importedCount = 0;
    for (const ebook of ebooks) {
      // Find category
      const catName = ebook.category || 'Estudos Bíblicos';
      let categoryId = categoryMap[catName];
      
      if (!categoryId) {
        // Fallback or create new category if it wasn't in the list
        const slug = catName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
        const createdCat = await prisma.category.upsert({
          where: { slug },
          update: {},
          create: { name: catName, slug, description: catName }
        });
        categoryId = createdCat.id;
        categoryMap[catName] = categoryId;
      }

      const slug = (ebook.title || 'ebook').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\W+/g, '-').substring(0, 100) + '-' + ebook.id;

      await prisma.ebook.upsert({
        where: { slug },
        update: {},
        create: {
          title: ebook.title,
          slug,
          author: ebook.author || 'Fabio Russo',
          categoryId: categoryId,
          description: ebook.description,
          fullDescription: ebook.fullDescription || ebook.description,
          capa: ebook.capa || ebook.coverImage || '/capas/ebook-1.jpg',
          link: ebook.link || null,
          rating: ebook.rating || 5,
          pages: ebook.pages || 10,
          language: ebook.language || 'Português',
          format: ebook.format || 'PDF',
          publishDate: ebook.publishDate || '2024-01-01',
          views: ebook.views || 0,
          featured: ebook.featured || false,
          status: 'published'
        }
      });
      importedCount++;
    }
    console.log(`Successfully migrated ${importedCount} ebooks to the database.`);
  } else {
    console.error('Failed to parse ebooks array');
  }
}

seed().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(() => {
  prisma.$disconnect();
});
