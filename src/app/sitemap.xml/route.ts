import { NextResponse } from "next/server";
import { api } from "@/app/api";
import { EventsByMonth } from "@/types/event";
import { NewsType } from "@/types/news";
import { ConfigurationTypes } from "@/types/configuration";

export const revalidate = 0;

export async function GET() {
  const data = await api.configuration.getAll({ next: { revalidate: 0 } }) as ConfigurationTypes;
  const baseUrl = 'https://' + data?.site;

  const menu_schedule = true;
  const menu_news = true;

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

    try {
      const response = await api.events.getMonth({ next: { revalidate: 0 } }) as EventsByMonth;
      if (response) {
        const events = Object.values(response).flat();

        events.forEach((event) => {
          if (event.url) {
            xml += `
              <url>
                <loc>${baseUrl}/agenda/${event.url}</loc>
                <lastmod>${event.updated_at || new Date().toISOString()}</lastmod>
                <changefreq>weekly</changefreq>
                <priority>0.9</priority>
              </url>
            `;
          }
        });
      }
    } catch (error) {
      console.error("Error fetching events for sitemap:", error);
    }
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

    try {
      const newsResponse = await api.news.getAll({ next: { revalidate: 0 } }) as NewsType[];
      if (newsResponse && Array.isArray(newsResponse)) {
        newsResponse.forEach((item) => {
          if (item.url) {
            xml += `
              <url>
                <loc>${baseUrl}/noticia/${item.url}</loc>
                <lastmod>${item.updated_at || new Date().toISOString()}</lastmod>
                <changefreq>weekly</changefreq>
                <priority>0.9</priority>
              </url>
            `;
          }
        });
      }
    } catch (error) {
      console.error("Error fetching news for sitemap:", error);
    }
  }

  xml += `</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
