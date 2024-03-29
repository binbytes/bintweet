import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
const GRAPHQL_ENDPOINT = `http://10.0.2.2:8080/v1alpha1/graphql`
const createApolloClient = token => {
  const link = new HttpLink({
    uri: GRAPHQL_ENDPOINT
  })
  return new ApolloClient({
    link,
    cache: new InMemoryCache()
  })
}
export default createApolloClient
