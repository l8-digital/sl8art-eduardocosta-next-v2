"use client";

import { SocialType } from "@/types/configuration";
import { createContext, useContext } from "react";

type ConfigApp = {
  title: string | null;
  logo: string | null;
  logo_white: string | null
  linksocial: SocialType
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
