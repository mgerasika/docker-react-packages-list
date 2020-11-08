import { ApolloClient, createHttpLink, InMemoryCache, useQuery } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
const queryString = require('query-string');

export const apolloClientLocalhost = new ApolloClient({ uri: "http://localhost:5000",cache:new InMemoryCache() });

export const apolloClientHeroku = new ApolloClient({ uri: "https://docker-nestjs.herokuapp.com/graphql",cache:new InMemoryCache() });
export const apolloClientHeroku2 = new ApolloClient({ uri: "http://localhost:5003/graphql",cache:new InMemoryCache() });

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const query = queryString.parse(document.location.search);
  const token = localStorage.getItem('token') || query.code;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    }
  }
});


export const apolloClientGithub = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
