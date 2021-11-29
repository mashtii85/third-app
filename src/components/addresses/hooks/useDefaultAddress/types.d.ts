/**
 * Components - Addresses - Hooks - useUpdate - Types.d
 */

// Types.d
import { ENTITIES } from '../../../../constants/entities'
import { UseHookOutput } from '../../../../types/hook.d'

export interface DefaultAddressHookProps {
  id: number
  entity: ENTITIES
  entityId: number
  deleteKey: string
  value: any
}

export interface UseDefaultAddressOutput extends UseHookOutput {
  defaultAddress: any
}
