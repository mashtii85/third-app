/**
 * Components - Media - Hooks - useUpdate - useUpdate
 */

// Apollo
import { useMutation } from '@apollo/client'
import { UPDATE_MEDIUM_BY_PK } from '../../queries/queries'

// Types
import {
  MediaUpdateData,
  MediaUpdateVariables,
  UseHookProps,
  UseUpdateMediaOutput
} from '@availabletowork/types'

export const useUpdateMedia = (props: UseHookProps<MediaUpdateData>): UseUpdateMediaOutput => {
  const [updateMedia, { loading, error }] = useMutation<MediaUpdateData, MediaUpdateVariables>(
    UPDATE_MEDIUM_BY_PK,
    {
      onCompleted: props.onCompleted,
      onError: props.onError
    }
  )
  return { error, loading, updateMedia }
}
