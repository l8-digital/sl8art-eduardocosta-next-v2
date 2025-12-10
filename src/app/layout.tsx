import "@/styles/globals.css";
import { fonts } from "@/config/fonts";
import { getThemeCss } from "@/config/theme";
import { api } from "./api";
import { createMetadata } from "@/config/metadata";
import type { Metadata } from "next";
import { Preload } from "@/config/preload";
import type { PlataformsIdTypes, SocialType } from "@/types/configuration";
import { Providers } from "./providers/providers";
import { AppProviders } from "./providers/app";
import { GoogleAnalytics } from "@/config/analitcs";

export async function generateMetadata(): Promise<Metadata> {
  const data = await api.configuration.getSocial() as SocialType[];
  const meta = data[0]
  return createMetadata(meta);
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  const themeCss = await getThemeCss();
  const social = await api.configuration.getSocial() as SocialType[];
  const config = await api.configuration.getPlataformsId() as PlataformsIdTypes[];
  const analitcsId = config[0].analytics_metric;
  console.log(config)

  const ConfigApp = {
    title: social[0].meta_title,
    logo: social[0].logo_cdn,
    logo_white: social[0].white_logo_cdn
  };


  return (
    <html lang="pt-BR" className={fonts}>
      <head>
        <style>{`:root { ${themeCss} }`}</style>
        <Preload />
      </head>

      <body suppressHydrationWarning className="antialiased">
        {analitcsId &&
          <GoogleAnalytics gaId={analitcsId} />
        }
        <AppProviders value={ConfigApp}>
          <Providers>
            {children}
          </Providers>
        </AppProviders>

      </body>

    </html>
  );
}
