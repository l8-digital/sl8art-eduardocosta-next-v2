import { NextResponse } from "next/server";
import { api } from "../api";
import { ConfigurationTypes } from "@/types/configuration";

export async function GET() {
    const data = await api.configuration.getAll() as ConfigurationTypes;
    const baseUrl = 'https://' + data?.site;
    
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
