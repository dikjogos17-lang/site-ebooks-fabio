const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

async function main() {
  const ebooks = await prisma.ebook.findMany({ include: { category: true } });
  const categories = await prisma.category.findMany();

  const ebooksFormatted = ebooks.map(e => ({
    id: e.id,
    title: e.title,
    author: e.author,
    description: e.description,
    fullDescription: e.fullDescription,
    capa: e.capa,
    category: e.category ? e.category.name : 'Outros',
    rating: e.rating,
    pages: e.pages,
    language: e.language,
    format: e.format,
    publishDate: e.publishDate,
    featured: e.featured,
    views: e.views,
    slug: e.slug
  }));

  const ebooksFile = `export interface Ebook {
  id: string;
  title: string;
  author: string;
  description: string;
  fullDescription?: string;
  capa: string;
  category: string;
  rating: number;
  pages: number;
  language: string;
  format: string;
  publishDate: string;
  featured?: boolean;
  views?: number;
  slug?: string;
}

export const ebooks: Ebook[] = ${JSON.stringify(ebooksFormatted, null, 2)};
`;

  fs.writeFileSync('./src/data/ebooks.ts', ebooksFile);

  const catsFile = `export const categories = ${JSON.stringify(categories.map(c => c.name), null, 2)};`;
  fs.writeFileSync('./src/data/categories.ts', catsFile);

  console.log('Dump completed');
}

main().finally(() => prisma.$disconnect());
