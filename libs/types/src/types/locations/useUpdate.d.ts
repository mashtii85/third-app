/**
 * Components - Locations - Hooks - UseUpdateLocation - Types.d
 */

// Constants
import { STATUS_ACTIVE } from '@availabletowork/constants'

// Types
import { UseHookOutput } from '../general'
import { Location } from './locations'

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
