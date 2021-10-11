/**
 * Components - Posts - Hooks - useDelete - useDelete
 */

// Apollo
import { useMutation } from '@apollo/client'
import { DELETE_POST_BY_PK, GET_POSTS } from '../../queries/queries'

// Types
import { PostDeleteData, PostDeleteVariables, UseDeletePostOutput } from './types.d'
import { UseHookProps } from '../../../../types/hook.d'
import { PostDeleteType } from '../useDelete/types.d'
import { Post } from '../../../../types/post.d'
import { GraphqlWhere } from '../../../../types/gql'

export const useDeletePost = (
  filters: PostDeleteType,
  props: UseHookProps<PostDeleteData>
): UseDeletePostOutput => {
  const [deletePost, { loading, error }] = useMutation<PostDeleteData, PostDeleteVariables>(
    DELETE_POST_BY_PK,
    {
      onCompleted: props.onCompleted,
      onError: props.onError,
      update(cache, { data }) {
        const where: GraphqlWhere<Post> = {
          account_id: { _eq: filters.accountId },
          entity: { _eq: filters.entity },
          entity_id: { _eq: filters.entityId },
          type: { _eq: filters.type! }
        }
        const { posts } = cache.readQuery<{ posts: Post[] }>({
          query: GET_POSTS,
          variables: { where }
        }) || { posts: [] }
        const postList = posts.filter((post) => post.id !== data?.post.id)
        cache.writeQuery({
          query: GET_POSTS,
          variables: { where },
          data: { posts: postList }
        })
      }
    }
  )
  return { error, loading, deletePost }
}
