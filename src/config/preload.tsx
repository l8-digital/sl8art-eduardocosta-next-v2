// app/_preload.tsx
import { baseUrl } from "@/utils/baseUrl";

export function Preload() {
  return (
    <>
      <link
        rel="preload"
        href={baseUrl("images/hero-mobile.avif")}
        as="image"
        fetchPriority="high"
      />

      <link
        rel="preload"
        href={baseUrl("images/hero.avif")}
        as="image"
        fetchPriority="high"
      />
    </>
  );
}
