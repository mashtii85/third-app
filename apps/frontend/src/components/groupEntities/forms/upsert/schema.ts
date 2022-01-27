/**
 * Components - GroupEntities - Forms - Upsert - Schema
 */

// Yup
import { mixed, object, SchemaOf, string } from 'yup'

// Types
import { GroupEntityFormType, STATUS_ACTIVE } from '@availabletowork/types'

export const GroupSchema: SchemaOf<GroupEntityFormType> = object().shape({
  group: object({
    label: string().required(),
    value: string().required()
  }).required(),
  status: mixed().oneOf(Object.values(STATUS_ACTIVE)).required()
})
