/**
 * Components - Groups - Forms - Create - Schema
 */

// Yup
import { mixed, object, string, SchemaOf } from 'yup'

//Constants
import { STATUS_ACTIVE } from '@availabletowork/constants'

// Types
import { GroupFormType } from '@availabletowork/types'

export const GroupSchema: SchemaOf<GroupFormType> = object()
  .shape({
    name: string().required(),
    description: string(),
    status: mixed().oneOf(Object.values(STATUS_ACTIVE)).required()
  })
  .required()
