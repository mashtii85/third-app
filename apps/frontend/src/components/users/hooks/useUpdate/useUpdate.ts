/**
 * Components - Courses - Hooks - UseUpdateCourse - useDeleteCourse
 */

// Apollo
import { useMutation } from '@apollo/client'
import { UPDATE_USER } from '../../queries'

// Types
import {
  UseHookProps,
  UserUpdateData,
  UserUpdateVariables,
  UseUpdateUserOutput
} from '@availabletowork/types'

export const useUpdateUser = (props: UseHookProps<UserUpdateData>): UseUpdateUserOutput => {
  const [updateUser, { loading, error }] = useMutation<UserUpdateData, UserUpdateVariables>(
    UPDATE_USER,
    {
      onCompleted: props.onCompleted,
      onError: props.onError
    }
  )
  return { error, loading, updateUser }
}
