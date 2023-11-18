import Script from "next/script";

export function GoogleAdsense() {
  return (
    <>
      <Script
        async
        crossOrigin="anonymous"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ACCOUNT}`}
      />
    </>
  );
}