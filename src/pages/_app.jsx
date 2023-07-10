import "../styles/globals.css";
import theme from "../styles/theme";

import { Analytics } from "@vercel/analytics/react";
import { ChakraProvider } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import Loading from "./loading";
import Header from "../components/header";
import Footer from "../components/footer";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    router.events.on("routeChangeStart", (url) => {
      setLoading(true);
    });

    router.events.on("routeChangeComplete", (url) => {
      setLoading(false);
    });
  }, [router.events]);

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Tech Optimum</title>
      </Head>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <Component {...pageProps} /> <Footer />
        </>
      )}

      <Analytics />
    </ChakraProvider>
  );
}

export default MyApp;
