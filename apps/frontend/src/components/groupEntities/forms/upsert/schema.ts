/**
 * Components - GroupEntities - Forms - Upsert - Schema
 */

// Yup
import { mixed, object, SchemaOf, string } from 'yup'

// Constants
import { STATUS_ACTIVE } from '@availabletowork/constants'

// Types
import { GroupEntityFormType } from '@availabletowork/types'

export const GroupSchema: SchemaOf<GroupEntityFormType> = object().shape({
  group: object({
    label: string().required(),
    value: string().required()
  }).required(),
  status: mixed().oneOf(Object.values(STATUS_ACTIVE)).required()
})
