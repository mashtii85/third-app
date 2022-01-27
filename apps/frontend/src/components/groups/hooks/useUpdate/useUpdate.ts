/**
 * Components - Groups - Hooks - useUpdate - useUpdate
 */

// Apollo
import { useMutation } from '@apollo/client'
import { UPDATE_GROUP_BY_PK } from '../../queries/queries'

// Types
import {
  GroupUpdateData,
  GroupUpdateVariables,
  UseHookProps,
  UseUpdateGroupOutput
} from '@availabletowork/types'

export const useUpdateGroup = (props: UseHookProps<GroupUpdateData>): UseUpdateGroupOutput => {
  const [updateGroup, { loading, error }] = useMutation<GroupUpdateData, GroupUpdateVariables>(
    UPDATE_GROUP_BY_PK,
    {
      onCompleted: props.onCompleted,
      onError: props.onError
    }
  )
  return { error, loading, updateGroup }
}
