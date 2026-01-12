"use client";

import Script from "next/script";

export function GoogleAnalytics({ gaId }: { gaId: string }) {
  if (!gaId) return null;

  return (
    <>
      <Script
        id="gtag-loader"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />

      {/* GA init → BODY */}
      <Script id="gtag-init" strategy="lazyOnload">
        {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${gaId}', {
      anonymize_ip: true,
      send_page_view: false,
    });
  `}
      </Script>
    </>
  );
}
