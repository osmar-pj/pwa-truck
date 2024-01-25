import App from "next/app";
import "@/src/globals.scss";
import { Saira } from "next/font/google";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "@/src/components/c-header";
import { DriverProvider } from "@/src/lib/DriverContext";
import Foot from "@/src/components/c-footer";

const inter = Saira({ subsets: ["latin"], weight:['300', '400', '500', '600', '700'] });

function MyApp({ Component, pageProps }) {
  
  const [isOnline, setIsOnline] = useState(true)
  useEffect(() => {
    if (typeof window !== 'undefined' && 'ononline' in window && 'onoffline' in window) {
      setIsOnline(window.navigator.onLine)
      if (!window.ononline) {
        window.addEventListener('online', () => {
          setIsOnline(true)
        })
      }
      if (!window.onoffline) {
        window.addEventListener('offline', () => {
          setIsOnline(false)
        })
      }
    }
  }, [])

  const router = useRouter()
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined && isOnline) {
      // skip index route, because it's already cached under `start-url` caching object
      if (router.route !== '/') {
        const wb = window.workbox
        wb.active.then(worker => {
          wb.messageSW({ action: 'CACHE_NEW_ROUTE' })
        })
      }
    }
  }, [isOnline, router.route])
  
  return (
    <DriverProvider>
    <main className={inter.className}>     
      <Component {...pageProps} />
      <Foot />
    </main>
    </DriverProvider>
  );
}



export default MyApp;
