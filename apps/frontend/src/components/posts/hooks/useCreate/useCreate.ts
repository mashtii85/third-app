/**
 * Components - Posts - Hooks - useCreate
 */

// Apollo
import { useMutation } from '@apollo/client'
import { CREATE_POSTS, GET_POSTS } from '@availabletowork/queries'

// Types
import {
  GraphqlWhere,
  Post,
  PostCreateType,
  PostCreateData,
  PostFilter,
  UseCreatePostOutput,
  UseHookProps
} from '@availabletowork/types'

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
        const where: GraphqlWhere<Post> = {
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
