/**
 * Components - Posts - Hooks - useUpdate - useUpdate
 */

// Apollo
import { useMutation } from '@apollo/client'
import { UPDATE_POST_BY_PK } from '@availabletowork/queries'

// Types
import {
  PostUpdateData,
  PostUpdateVariables,
  UseHookProps,
  UseUpdatePostOutput
} from '@availabletowork/types'

export const useUpdatePost = (props: UseHookProps<PostUpdateData>): UseUpdatePostOutput => {
  const [updatePost, { loading, error }] = useMutation<PostUpdateData, PostUpdateVariables>(
    UPDATE_POST_BY_PK,
    {
      onCompleted: props.onCompleted,
      onError: props.onError
    }
  )
  return { error, loading, updatePost }
}
