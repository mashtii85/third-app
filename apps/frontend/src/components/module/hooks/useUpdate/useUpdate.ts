/**
 * Components - Module - Hooks - useUpdate - useUpdate
 */

// Apollo
import { useMutation } from '@apollo/client'
import { UPDATE_MODULE_BY_PK } from '../../queries/queries'

// Types
import { ModuleUpdateData, ModuleUpdateVariables, UseUpdateModuleOutput } from './types.d'
import { UseHookProps } from '../../../../types/hook.d'

export const useUpdateModule = (props: UseHookProps<ModuleUpdateData>): UseUpdateModuleOutput => {
  const [updateModule, { loading, error }] = useMutation<ModuleUpdateData, ModuleUpdateVariables>(
    UPDATE_MODULE_BY_PK,
    {
      onCompleted: props.onCompleted,
      onError: props.onError
    }
  )
  return { error, loading, updateModule }
}
