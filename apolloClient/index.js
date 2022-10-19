import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const enchancedFetch = (url, init) => {
  return fetch(url, {
    ...init,
    headers: {
      ...init.headers,
      'Access-Control-Allow-Origin': '*',
    },
  }).then(response => response);
};

const httpLink = new createHttpLink({
  uri: "http://localhost:3000/api/graphql",
  credentials: 'include',
  fetchOptions: {
    mode: 'cors',
  },
  fetch: enchancedFetch,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;