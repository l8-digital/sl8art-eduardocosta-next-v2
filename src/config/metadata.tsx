export const dynamic = "force-dynamic";
import { ConfigurationTypes, SocialType } from "@/types/configuration";
import type { Metadata } from "next";

export interface SeoConfig {
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  meta_image_cdn: string;
  favicon_cdn: string;

}

export function createMetadata(data: ConfigurationTypes): Metadata {

  const metadata = data.basic_configurations[0];
  const favicon = metadata.favicon_cdn ?? "";

  return {

    title: {
      default: metadata.meta_title ?? '',
      template: `%s | ${metadata.meta_title}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    description: metadata.meta_description,
    keywords: metadata.meta_keywords,
    alternates: {
      canonical: '/',
      languages: { 'pt-BR': '/' },
    },
    authors: [{ name: 'Valepix' }],
    metadataBase: new URL(`https://${data?.site ?? 'localhost:3000'}`),
    openGraph: {
      title: metadata.meta_title ? metadata.meta_title : '',
      description: metadata.meta_description ? metadata.meta_description : '',
      url: "/",
      type: "website",
      locale: "pt_BR",
      siteName: metadata.meta_title ? metadata.meta_title : '',
      images: [
        {
          url: metadata.meta_image_cdn ? metadata.meta_image_cdn : '',
          width: 1200,
          height: 630,
          alt: metadata.meta_title ? metadata.meta_title : '',
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: metadata.meta_title ? metadata.meta_title : '',
      description: metadata.meta_description ? metadata.meta_description : '',
      images: [metadata.meta_image_cdn ? metadata.meta_image_cdn : '',],
    },

    icons: {
      icon: favicon,
      shortcut: favicon,
      apple: favicon,
    },
  };
}
