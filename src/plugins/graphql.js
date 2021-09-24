import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  // eslint-disable-next-line no-unused-vars
  split
} from '@apollo/client/core';

import { setContext } from '@apollo/client/link/context';
import { BatchHttpLink } from "@apollo/client/link/batch-http";

// import { WebSocketLink } from '@apollo/client/link/ws'
// eslint-disable-next-line no-unused-vars
import { getMainDefinition } from '@apollo/client/utilities'
import { createApolloProvider } from '@vue/apollo-option'

// eslint-disable-next-line no-unused-vars
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
const token = localStorage.getItem('user');
// return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
    }
  }
});
const httpLink  = createHttpLink(
{
  uri: 'http://www.bolt.local/graphql', 
});

// eslint-disable-next-line no-unused-vars
const httpLinkAuth = authLink.concat(httpLink);


const batchLink  = new BatchHttpLink({ 
    uri: "http://www.bolt.local/graphql",
    batchMax: 1, // No more than 5 operations per batch
    batchInterval: 20, // Wait no more than 20ms after first batched operation
 });

 // eslint-disable-next-line no-unused-vars
 const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' &&
      operation === 'subscription'
  },
  batchLink,
  httpLinkAuth
)
export const  apolloClient = new ApolloClient({ 
  link: httpLinkAuth,
  // link:link,
  cache: new InMemoryCache()
 });
// export default apolloClient

export const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})
