import "@/styles/globals.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import GlobalLoader from "@/components/ui/GlobalLoader";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleDone = () => setIsLoading(false);
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleDone);
    router.events.on("routeChangeError", handleDone);
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleDone);
      router.events.off("routeChangeError", handleDone);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <GlobalLoader isLoading={isLoading} />
      <Component {...pageProps} />
    </>
  );
}
