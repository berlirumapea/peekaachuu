import React from "react";
import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist";
import "../style/global.scss";

import apolloClient, { cache } from "../apollo/client";
import LoadingContainer from "../components/PikachuLoading";

function MyApp({ Component, pageProps }) {
  const [client, setClient] = React.useState(null);

  React.useEffect(async () => {
    /*
      Run this on client because localStorage is not available
      on the server
    */
    await persistCache({
      cache,
      storage: new LocalStorageWrapper(window.localStorage),
      trigger: "write",
    });

    setClient(apolloClient);
  }, []);

  /*
    Since we're waiting persistCache to be done
    I want to show loading screen instead
  */

  if (!client) {
    return <LoadingContainer />;
  }

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <meta charSet="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta name="author" content="Berlianto Rumapea" />
        <meta
          name="description"
          content="Pokemon APP using NextJS and Apollo-client"
        />
        <meta
          name="keywords"
          content="Pokemon, Graphql, PokeAPI, NextJS, React, Javascript"
        />

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/images/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/images/icons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/images/icons/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
