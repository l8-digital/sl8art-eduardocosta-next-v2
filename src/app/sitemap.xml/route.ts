import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://meusite.com";

  const menu_schedule = true;
  const menu_news = true;

  const calendar = [
    { url: "show-sao-paulo", updated_at: "2024-08-01T12:00:00.000Z" },
    { url: "show-rio", updated_at: "2024-08-05T12:00:00.000Z" },
  ];

  const news = [
    { url: "novo-album", updated_at: "2024-08-02T15:30:00.000Z" },
    { url: "entrevista", updated_at: "2024-08-07T10:00:00.000Z" },
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n`;

  // Página inicial
  xml += `
    <url>
      <loc>${baseUrl}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>
  `;

  // Agenda
  if (menu_schedule) {
    xml += `
      <url>
        <loc>${baseUrl}/agenda</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
      </url>
    `;

    calendar.forEach((each) => {
      xml += `
        <url>
          <loc>${baseUrl}/agenda/${each.url}</loc>
          <lastmod>${each.updated_at}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.9</priority>
        </url>
      `;
    });
  }

  // Notícias
  if (menu_news) {
    xml += `
      <url>
        <loc>${baseUrl}/noticia</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
      </url>
    `;

    news.forEach((each) => {
      xml += `
        <url>
          <loc>${baseUrl}/noticia/${each.url}</loc>
          <lastmod>${each.updated_at}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.9</priority>
        </url>
      `;
    });
  }

  xml += `</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
