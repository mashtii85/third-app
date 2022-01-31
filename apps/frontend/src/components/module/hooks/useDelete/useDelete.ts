/**
 * Components - ModuleS - Hooks - useDelete - useDelete
 */

// Apollo
import { useMutation } from '@apollo/client'
import { DELETE_MODULE_BY_PK } from '@availabletowork/queries'

// Hooks
import { useModule } from '../useModule/useModule'

// Types
import {
  ModuleDeleteData,
  ModuleDeleteProps,
  ModuleDeleteVariables,
  UseDeleteModuleOutput,
  UseHookProps
} from '@availabletowork/types'

export const useDeleteModule = (
  moduleProps: ModuleDeleteProps,
  props: UseHookProps<ModuleDeleteData>
): UseDeleteModuleOutput => {
  const { refetch } = useModule({ courseId: moduleProps.courseId })
  const [deleteModule, { loading, error }] = useMutation<ModuleDeleteData, ModuleDeleteVariables>(
    DELETE_MODULE_BY_PK,
    {
      onCompleted: props.onCompleted,
      onError: props.onError,
      update() {
        // apollo cache isn't working correctly here
        refetch()
      }
    }
  )
  return { error, loading, deleteModule }
}
