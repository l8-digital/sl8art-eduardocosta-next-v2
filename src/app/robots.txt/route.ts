import { NextResponse } from "next/server";

export async function GET() {
    const baseUrl = "https://meusite.com";

    const robotsTxt = `
User-agent: *
Allow: /

Disallow: /admin
Disallow: /api

Sitemap: ${baseUrl}/sitemap.xml
Host: ${baseUrl}
  `.trim();

    return new NextResponse(robotsTxt, {
        headers: {
            "Content-Type": "text/plain",
        },
    });
}
