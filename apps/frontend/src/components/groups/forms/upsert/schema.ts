/**
 * Components - Groups - Forms - Create - Schema
 */

// Yup
import { mixed, object, string, SchemaOf } from 'yup'

// Types
import { GroupFormType } from './types.d'
import { STATUS_ACTIVE } from '../../../../types/select.d'

export const GroupSchema: SchemaOf<GroupFormType> = object()
  .shape({
    name: string().required(),
    description: string(),
    status: mixed().oneOf(Object.values(STATUS_ACTIVE)).required()
  })
  .required()
