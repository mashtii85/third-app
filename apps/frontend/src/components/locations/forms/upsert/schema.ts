/**
 * Components - Locations - Forms - Upsert - Schema
 */

// Yup
import { mixed, number, object, string, SchemaOf } from 'yup'

// Constants
import { STATUS_ACTIVE } from '@availabletowork/constants'

// Types
import { LocationFormType } from '@availabletowork/types'

export const LocationSchema: SchemaOf<LocationFormType> = object().shape({
  id: number(),
  name: string().required(),
  status: mixed().oneOf(Object.values(STATUS_ACTIVE)),
  taxonomy: object().shape({
    label: string(),
    value: string()
  })
})
