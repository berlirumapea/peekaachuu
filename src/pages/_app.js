import React from "react";
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
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
