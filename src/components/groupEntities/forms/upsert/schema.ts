/**
 * Components - GroupEntities - Forms - Upsert - Schema
 */

// Yup
import { mixed, object, SchemaOf, string } from 'yup'

// Types
import { STATUS_ACTIVE } from '../../../../types/select.d'
import { GroupEntityFormType } from './types'

export const GroupSchema: SchemaOf<GroupEntityFormType> = object().shape({
  group: object({
    label: string().required(),
    value: string().required()
  }).required(),
  status: mixed().oneOf(Object.values(STATUS_ACTIVE)).required()
})
