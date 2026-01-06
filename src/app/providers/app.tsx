"use client";

import { SocialType } from "@/types/configuration";
import { createContext, useContext } from "react";

type ConfigApp = {
  title: string | undefined | null;
  logo: string | undefined | null;
  logo_white: string | undefined | null;
  linksocial: SocialType | undefined | null;
};

const ConstContext = createContext<ConfigApp>({} as ConfigApp);

export function AppProviders({ value, children }: { value: ConfigApp, children: React.ReactNode }) {
  return (
    <ConstContext.Provider value={value}>
      {children}
    </ConstContext.Provider>
  );
}

export function useConfigApp() {
  return useContext(ConstContext);
}
