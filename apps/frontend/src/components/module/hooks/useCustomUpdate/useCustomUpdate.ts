/**
 * Components - Module - Hooks - useUpdate - useUpdate
 */

// Apollo
import { gql, useMutation } from '@apollo/client'

// Types
import { ModuleUpdateData, ModuleUpdateVariables, UseUpdateModuleOutput } from './types.d'
import { UseHookProps } from '../../../../types/hook.d'

export const useCustomUpdateModule = (
  customQuery: string,
  { onCompleted, onError }: UseHookProps<ModuleUpdateData>
): UseUpdateModuleOutput => {
  const [updateModule, { loading, error }] = useMutation<ModuleUpdateData, ModuleUpdateVariables>(
    gql`
      ${customQuery}
    `,
    {
      onCompleted,
      onError
    }
  )
  return { error, loading, updateModule }
}
