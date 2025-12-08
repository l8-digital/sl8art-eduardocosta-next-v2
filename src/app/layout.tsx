import "@/styles/globals.css";
import { fonts } from "@/config/fonts";
import { getThemeCss } from "@/config/theme";
import { api } from "./api";
import { createMetadata } from "@/config/metadata";
import type { Metadata } from "next";
import { Preload } from "@/config/preload";
import type { SocialType } from "@/types/configuration";
import { Providers } from "./providers/providers";
import { AppProviders } from "./providers/app";

export async function generateMetadata(): Promise<Metadata> {
  const data = await api.configuration.getSocial() as SocialType[];
  const meta = data[0]
  return createMetadata(meta);
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  const themeCss = await getThemeCss();
  const config = await api.configuration.getSocial() as SocialType[];

  const ConfigApp = {
    title: config[0].meta_title,
    logo: config[0].logo_cdn,
    logo_white: config[0].white_logo_cdn
  };


  return (
    <html lang="pt-BR" className={fonts}>
      <head>
        <style>{`:root { ${themeCss} }`}</style>
        <Preload />
      </head>

      <body suppressHydrationWarning className="antialiased">

        <AppProviders value={ConfigApp}>
          <Providers>
            {children}
          </Providers>
        </AppProviders>

      </body>

    </html>
  );
}
