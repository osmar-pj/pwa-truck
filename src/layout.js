import Head from "next/head";
import Script from "next/script.js";
import Adblock from "./adblock";

export default function Layout({ children }) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      <Script id="google-analytics-script" strategy="lazyOnload">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                        page_path: window.location.pathname,
                    });
                    `}
      </Script>
      <Head>
        <title>Gunjop - Truck</title>
        <meta name="Gunjop - Home" content="Gunjop" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="gunjop" />
        <meta name="description" content="Sistema volquete" />
        <meta name="keywords" content="Sistema volquete" />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="og:title" content="Gunjop" />
        <meta name="google-site-verification" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <Adblock />
        {children}
      </>
    </>
  );
}
