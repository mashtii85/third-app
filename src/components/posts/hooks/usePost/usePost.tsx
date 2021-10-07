/**
 * Components - Posts - Hooks - usePost
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_POSTS } from '../../queries/queries'

// Types
import { PostDataList, PostFilter } from './types.d'

// Utils
import { GraphQLWhereClause } from '../../../../types/graphQL.d'

export const usePost = (filters: Partial<PostFilter>) => {
  const where: GraphQLWhereClause = {}
  if (filters.accountId) where.account_id = { _eq: filters.accountId }
  if (filters.entity) where.entity = { _eq: filters.entity }
  if (filters.entityId) where.entity_id = { _eq: filters.entityId }
  if (filters.type) where.type = { _eq: filters.type }
  const { data, error, loading, refetch } = useQuery<PostDataList>(GET_POSTS, {
    variables: { where }
  })

  if (error) {
    return { loading: false, error, posts: [] }
  }

  return { loading, posts: data?.posts || [], refetch }
}
