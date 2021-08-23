/**
 * Services - Apollo Client
 *
 * @see https://hasura.io/docs/1.0/graphql/manual/guides/integrations/apollo-subscriptions.html
 */

// React
import { useMemo } from 'react'

// Apollo
import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache, split } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'

// Utils
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'
import fetch from 'node-fetch'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient

const getToken = () => {
  const token = localStorage.getItem('bearerToken')
  return token ? `Bearer ${token}` : ''
}

const httpLink = new HttpLink({
  fetch: fetch,
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL
})

let wsLink = httpLink

if (process.browser) {
  wsLink = new WebSocketLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL_WS,
    options: {
      reconnect: true,
      lazy: true,
      connectionParams: () => {
        const token = getToken()

        return token
          ? {
              headers: {
                Authorization: token
              }
            }
          : null
      }
    }
  })
}

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = getToken()
  token &&
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: token
      }
    }))

  return forward(operation)
})

function createApolloClient(Config) {
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
    name: `cleverly-${Config?.generalConfig?.isMobile ? 'mobile' : 'web'}`,
    ssrMode: typeof window === 'undefined',
    version: Config?.version || 'unknown'
  })
}

export function initializeApollo(initialState = null, Config) {
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

export function addApolloState(client, pageProps) {
  if (pageProps && pageProps.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

export function resetWsConnection() {
  wsLink.subscriptionClient.close(false, false)
}

export function useApollo(pageProps, Config) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const store = useMemo(() => initializeApollo(state, Config), [state])
  return store
}
