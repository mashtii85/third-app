/**
 * Services - Apollo Client
 *
 * @see https://hasura.io/docs/1.0/graphql/manual/guides/integrations/apollo-subscriptions.html
 */

// React
import { useMemo } from 'react'

// Apollo
import {
  ApolloClient,
  ApolloLink,
  DocumentNode,
  from,
  HttpLink,
  InMemoryCache,
  split
} from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'

// Utils
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'
import fetch from 'node-fetch'
import { LooseObject } from '../types/object'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient: any

// const getToken = () => {
//   const token = localStorage.getItem('bearerToken')
//   return token ? `Bearer ${token}` : ''
// }

const httpLink = new HttpLink({
  fetch,
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL
})

let wsLink: any = httpLink

if (process.browser) {
  wsLink = new WebSocketLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL_WS,
    options: {
      reconnect: true,
      lazy: true,
      connectionParams: (): LooseObject => {
        // Use full-access admin secret for now
        return {
          headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': process.env.NEXT_PUBLIC_GRAPHQL_SECRET
          }
        }
        // const token = getToken()
        // if (token) {
        //   return {
        //     headers: {
        //       Authorization: token
        //     }
        //   }
        // }
        // return null
      }
    }
  })
}

const link = split(
  ({ query }: { query: DocumentNode }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  httpLink
)

const authMiddleware = new ApolloLink((operation, forward) => {
  // Use full-access admin secret for now
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      'content-type': 'application/json',
      'x-hasura-admin-secret': process.env.NEXT_PUBLIC_GRAPHQL_SECRET
    }
  }))

  // const token = getToken()
  // token &&
  //   operation.setContext(({ headers = {} }) => ({
  //     headers: {
  //       ...headers,
  //       authorization: token
  //     }
  //   }))

  return forward(operation)
})

function createApolloClient(Config: any): ApolloClient<any> {
  return new ApolloClient({
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all'
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all'
      }
    },
    link: from([authMiddleware, link]),
    name: `rwa-${Config?.generalConfig?.isMobile ? 'mobile' : 'web'}`,
    ssrMode: typeof window === 'undefined',
    version: Config?.version || 'unknown'
  })
}

export function initializeApollo(initialState: any = null, Config: any): ApolloClient<any> {
  const _apolloClient = apolloClient || createApolloClient(Config)

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) => sourceArray.every((s) => !isEqual(d, s)))
      ]
    })

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function addApolloState(client: any, pageProps: any): any {
  if (pageProps && pageProps.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

export function resetWsConnection(): any {
  wsLink.subscriptionClient.close(false, false)
}

export function useApollo(pageProps: any, Config: any): ApolloClient<any> {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const store = useMemo(() => initializeApollo(state, Config), [state])
  return store
}
