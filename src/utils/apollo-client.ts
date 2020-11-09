import { ApolloClient, createHttpLink, InMemoryCache, useQuery } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { CONSTANTS } from './constants';

const httpLink = createHttpLink({
  uri: CONSTANTS.GITHUB_API_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const githubClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const herokuClient = new ApolloClient({ uri: CONSTANTS.HEROKU_GRAPHQL_URL,cache:new InMemoryCache() });
const localhostClient = new ApolloClient({ uri: CONSTANTS.LOCALHOST_GRAPHQL_URL,cache:new InMemoryCache() });

type TApolloClient = 'nest-heroku' | 'nest-localhost' | 'github';

const MAP:Record<TApolloClient,ApolloClient<object>> = {
  'github' : githubClient,
  'nest-heroku' : herokuClient,
  "nest-localhost": localhostClient
} 

export const getApolloClient = (name:TApolloClient):ApolloClient<object> => MAP[name];
