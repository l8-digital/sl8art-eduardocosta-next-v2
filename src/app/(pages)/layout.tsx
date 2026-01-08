export const dynamic = "force-dynamic";

import "@/styles/globals.css";
import { createMetadata } from "@/config/metadata";
import type { Metadata } from "next";

import type { ConfigurationTypes, PlataformsIdTypes, SocialType } from "@/types/configuration";

import { GoogleAnalytics } from "@/config/analitcs";
import { api } from "../api";
import { AppProviders } from "../providers/app";
import { Providers } from "../providers/providers";

export async function generateMetadata(): Promise<Metadata> {
  const data = await api.configuration.getAll() as ConfigurationTypes;
  const meta = data
  return createMetadata(meta);
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {

  const social = await api.configuration.getSocial() as SocialType[];
  const config = await api.configuration.getPlataformsId() as PlataformsIdTypes[];
  const analitcsId = config[0]?.analytics_metric;

  const ConfigApp = {
    title: social[0]?.meta_title,
    logo: social[0]?.logo_cdn,
    logo_white: social[0]?.white_logo_cdn,
    linksocial: social[0] as SocialType
  };

  return (
    <>
     
        {analitcsId &&
          <GoogleAnalytics gaId={analitcsId} />
        }
        <AppProviders value={ConfigApp}>
          <Providers>
            {children}
          </Providers>
        </AppProviders>


    </>
  );
}
