import React from "react";
import App from "./App";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "apollo-link-context";

const httpLink = createHttpLink({
  uri: "https://afternoon-temple-52803.herokuapp.com/",
});

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function ApolloProviders() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}
console.log(client);
export default ApolloProviders;
