/**
 * Components - Courses - Resources - Hooks - useCreate
 */

// Apollo
import { useMutation } from '@apollo/client'
import { CREATE_RESOURCES } from '../../queries/queries'
import { GET_POSTS } from '../../../../posts/queries/queries'

// Types
import { ResourceCreateData, UseCreateResourceOutput } from './types.d'
import { PostFilter } from '../../../../posts/hooks/usePost/types.d'
import { UseHookProps } from '../../../../../types/hook.d'
import { Post } from '../../../../../types/post.d'
import { GraphqlWhere } from '../../../../../types/gql.d'

export const useCreateResource = (
  filters: Partial<PostFilter>,
  props: UseHookProps<ResourceCreateData>
): UseCreateResourceOutput => {
  const [createResource, { loading }] = useMutation<ResourceCreateData>(CREATE_RESOURCES, {
    onCompleted: props.onCompleted,
    onError: props.onError,
    update(cache, { data }) {
      const where: GraphqlWhere<Post> = {
        account_id: { _eq: filters.accountId! },
        entity: { _eq: filters.entity! },
        entity_id: { _eq: filters.entityId! },
        type: { _eq: filters.type! }
      }
      const { posts } = cache.readQuery<{ posts: Post[] }>({
        query: GET_POSTS,
        variables: { where }
      }) || { posts: [] }
      cache.writeQuery({
        query: GET_POSTS,
        variables: { where },
        data: { posts: [...posts, ...[data?.post?.returning[0]?.post as Post]] }
      })
    }
  })
  return { createResource, loading }
}
