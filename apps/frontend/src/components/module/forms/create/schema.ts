/**
 * Components - Module - Forms - Create - Schema
 */

// Yup
import { mixed, object, string, SchemaOf } from 'yup'

// Constants
import { STATUS_ACTIVE } from '@availabletowork/constants'

// Types
import { ModuleFormType } from '@availabletowork/types'

export const ModuleSchema: SchemaOf<ModuleFormType> = object()
  .shape({
    title: string().required(),
    description: string(),
    status: mixed().oneOf(Object.values(STATUS_ACTIVE)).required()
  })
  .required()
