/**
 * Components - Modules - Hooks - useUpdate - useUpdate
 */

// Apollo
import { useMutation } from '@apollo/client'
import { SWAP_MODULES } from '../../queries/queries'

// Types
import { ModuleUpdateData, SwapModulesProps, UseUpdateModuleOutput } from './types.d'
import { UseHookProps } from '../../../../types/hook.d'

export const useSwapModule = (props: UseHookProps<ModuleUpdateData>): UseUpdateModuleOutput => {
  const [updateModule, { loading, error }] = useMutation<ModuleUpdateData, SwapModulesProps>(
    SWAP_MODULES,
    {
      onCompleted: props.onCompleted,
      onError: props.onError
    }
  )
  return { error, loading, updateModule }
}
