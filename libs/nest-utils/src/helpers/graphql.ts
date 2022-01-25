/**
 * Helpers - GraphQL Client
 */

// Libs
import { GraphQLClient } from 'graphql-request'

// Types
import { LooseObject } from '../types'

export const gqlClient = async (): Promise<any> => {
  const endpoint: string = process.env.GRAPHQL_URL || ''
  const headers = {
    'x-hasura-admin-secret': process.env.GRAPHQL_SECRET || '',
    'content-type': 'application/json'
  }
  return new GraphQLClient(endpoint, { headers })
}

export const query = async (query: any, data?: LooseObject): Promise<any> => {
  const client = await gqlClient()

  return await client.request(query, data).catch((error: any) => {
    console.error('Query error', JSON.stringify(error))
  })
}

export const mutation = async (query: any, data: LooseObject): Promise<any> => {
  const client = await gqlClient()

  return await client.request(query, data).catch((error: any) => {
    console.error('Mutation error', JSON.stringify(error))
  })
}
