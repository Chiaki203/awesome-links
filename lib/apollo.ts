import { ApolloClient, InMemoryCache } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';

export const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          links: relayStylePagination()
        }
      }
    }
  })
})

// const apolloClient = new ApolloClient({
//   uri: 'http://localhost:3000/api/graphql',
//   cache: new InMemoryCache()
// })

// export default apolloClient