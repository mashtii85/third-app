/**
 * Components - Posts - Hooks - usePost
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_POSTS } from '../../queries/queries'

// Types
import { GraphqlWhere, Post, PostDataList, PostFilter } from '@availabletowork/types'

export const usePost = (filters: Partial<PostFilter>) => {
  const where: GraphqlWhere<Post> = {}
  if (filters.accountId) where.account_id = { _eq: filters.accountId }
  if (filters.entity) where.entity = { _eq: filters.entity }
  if (filters.entityId) where.entity_id = { _eq: filters.entityId }
  if (filters.type) where.type = { _eq: filters.type }
  const { data, error, loading, refetch } = useQuery<PostDataList>(GET_POSTS, {
    variables: { where }
  })

  return { error, loading, posts: data?.posts || [], refetch }
}
