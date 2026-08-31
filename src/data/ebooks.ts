export interface Ebook {
  id: string;
  title: string;
  author: string;
  category: string | any;
  description: string;
  fullDescription?: string;
  rating: number;
  pages: number;
  capa: string;
  link?: string;
  language: string;
  format: string;
  publishDate: string;
  views: number;
  featured?: boolean;
}