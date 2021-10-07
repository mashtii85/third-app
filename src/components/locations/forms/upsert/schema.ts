/**
 * Components - Locations - Forms - Upsert - Schema
 */

// Yup
import { mixed, object, string, SchemaOf } from 'yup'

// Types
import { STATUS_ACTIVE } from '../../../../types/select.d'
import { LocationFormType } from './types.d'

export const LocationSchema: SchemaOf<LocationFormType> = object().shape({
  name: string().required(),
  status: mixed().oneOf(Object.values(STATUS_ACTIVE))
})
