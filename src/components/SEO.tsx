import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const SEO = ({ 
  title = 'EbookStore - Biblioteca Digital', 
  description = 'Descubra e-books focados em estudos da Bíblia, teologia e doutrinas cristãs.', 
  image = '/hero.png', 
  url = window.location.href 
}: SEOProps) => {
  useEffect(() => {
    // Update title
    const fullTitle = title === 'EbookStore - Biblioteca Digital' ? title : `${title} | EbookStore`;
    document.title = fullTitle;

    // Helper to update meta tags safely
    const setMetaTag = (attrName: string, attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard meta
    setMetaTag('name', 'description', description);

    // Open Graph
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:image', image);
    setMetaTag('property', 'og:url', url);
    setMetaTag('property', 'og:type', 'website');

    // Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', image);

  }, [title, description, image, url]);

  return null; // This component does not render anything
};

export default SEO;
