/**
 * Components - Posts - Hooks - useCreate
 */

// Apollo
import { useMutation } from '@apollo/client'
import { CREATE_POSTS, GET_POSTS } from '../../queries/queries'

// Types
import { PostCreateType, PostCreateData, UseCreatePostOutput } from './types.d'
import { PostFilter } from '../usePost/types.d'
import { UseHookProps } from '../../../../types/hook.d'
import { Post } from '../../../../types/post.d'
import { GraphQLWhereClause } from '../../../../types/graphQL.d'

export const useCreatePost = (
  filters: Partial<PostFilter>,
  props: UseHookProps<PostCreateData>
): UseCreatePostOutput => {
  const [createPost, { error, loading }] = useMutation<PostCreateData, PostCreateType>(
    CREATE_POSTS,
    {
      onCompleted: props.onCompleted,
      onError: props.onError,
      update(cache, { data }) {
        const where: GraphQLWhereClause = {
          account_id: { _eq: filters.accountId },
          entity: { _eq: filters.entity },
          entity_id: { _eq: filters.entityId },
          type: { _eq: filters.type }
        }
        const { posts } = cache.readQuery<{ posts: Post[] }>({
          query: GET_POSTS,
          variables: { where }
        }) || { posts: [] }
        cache.writeQuery({
          query: GET_POSTS,
          variables: { where },
          data: { posts: [...posts, ...(data?.posts?.returning as Post[])] }
        })
      }
    }
  )
  return { error, loading, createPost }
}
