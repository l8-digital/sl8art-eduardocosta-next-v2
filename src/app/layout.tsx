import { fonts } from "@/config/fonts";
import { Preload } from "@/config/preload";
import { getThemeCss } from "@/config/theme";
import "@/styles/globals.css";

export default async function RootLayout({ children, }: { children: React.ReactNode; }) {
  const themeCss = await getThemeCss();

  return (

    <html lang="pt-BR" className={fonts}>
      <head>
        <style>{`:root { ${themeCss} }`}</style>
        <Preload />
      </head>
      <body suppressHydrationWarning className="antialiased">{children}</body>
    </html>
  );
}
