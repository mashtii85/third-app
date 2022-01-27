/**
 * Components - Location - Forms - Upsert - types.d
 */

//Types
import { Options, STATUS_ACTIVE } from '../general'
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
