import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'

const cache = new InMemoryCache()
const link = createHttpLink({
  uri: `${process.env.REACT_APP_API_URL}/graphql/`,
})

export const client = new ApolloClient({
  cache,
  link,
})
