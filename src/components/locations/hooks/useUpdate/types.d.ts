/**
 * Components - Locations - Hooks - UseUpdateLocation - Types.d
 */

// Types.d
import { STATUS_ACTIVE } from '../../../../types/select.d'
import { UseHookOutput } from '../../../../types/hook.d'
import { Location } from '../../types.d'

export interface LocationUpdateVariables {
  accountId: number
  set: {
    status: STATUS_ACTIVE
    name: string
  }
}

export interface LocationUpdateData {
  location: Location
}

export interface UseUpdateLocationOutput extends UseHookOutput {
  data?: LocationUpdateData | null
  updateLocation: any
}
