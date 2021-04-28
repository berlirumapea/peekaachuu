import "../style/global.scss";
import { ApolloProvider } from "@apollo/client";
import client from "../app-apollo-client";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
