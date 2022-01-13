/**
 * Components - Location - Forms - Upsert - types.d
 */

import { Options } from '../../../../types/options'
import { STATUS_ACTIVE } from '../../../../types/select'
import { LocationFilter } from '../../types'

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
