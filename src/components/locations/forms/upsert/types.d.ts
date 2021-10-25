/**
 * Components - Location - Forms - Upsert - types.d
 */

import { LooseObject } from '../../../../types/object'
import { Options } from '../../../../types/options'
import { STATUS_ACTIVE } from '../../../../types/select'
import { Location, LocationFilter } from '../../types'

export interface LocationFormType {
  name: string
  status: STATUS_ACTIVE
}

export interface LocationFormSubmission extends LocationFormType {
  taxonomy?: Options
}

export interface LocationFormProps {
  onSuccess: () => void
  filters: LocationFilter
  defaultValues?: Location | LooseObject
}
