/**
 * Components - Location - Forms - Upsert - types.d
 */

// Constants
import { STATUS_ACTIVE } from '@availabletowork/constants'
// Types
import { Options } from '../general'
import { LocationFilter } from './locations'

export interface LocationFormType {
  id?: number
  name: string
  status: STATUS_ACTIVE
  taxonomy: Options
}

export interface LocationFormSubmission extends LocationFormType {
  taxonomy?: Options
}

export interface LocationFormProps {
  onSuccess: () => void
  filters: LocationFilter
  defaultValues?: Partial<LocationFormType>
}
