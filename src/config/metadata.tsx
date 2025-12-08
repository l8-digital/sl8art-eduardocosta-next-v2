import { SocialType } from "@/types/configuration";
import type { Metadata } from "next";

export interface SeoConfig {
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  meta_image_cdn: string;
  favicon_cdn: string;

}

export function createMetadata(data: SocialType): Metadata {


  const favicon = data.favicon_cdn ?? "";
  const metadata = data ;

  return {

    title: {
      default: metadata.meta_title ?? '',
      template: `%s | ${metadata.meta_title}`,
    },

    description: metadata.meta_description,
    keywords: metadata.meta_keywords,

    openGraph: {
      title: metadata.meta_title ?? '',
      description: metadata.meta_description ?? '',
      url: "/",
      type: "website",
      locale: "pt_BR",
      siteName: metadata.meta_title ?? '',
      images: [
        {
          url: metadata.meta_image_cdn ?? '',
          width: 1200,
          height: 630,
          alt: metadata.meta_title ?? '',
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: metadata.meta_title ?? '',
      description: metadata.meta_description ?? '',
      images: [metadata.meta_image_cdn ?? ''],
    },

    icons: {
      icon: favicon,
      shortcut: favicon,
      apple: favicon,
    },
  };
}
