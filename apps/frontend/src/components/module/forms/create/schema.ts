/**
 * Components - Module - Forms - Create - Schema
 */

// Yup
import { mixed, object, string, SchemaOf } from 'yup'

// Types
import { ModuleFormType } from './types.d'
import { STATUS_ACTIVE } from '../../../../types/select.d'

export const ModuleSchema: SchemaOf<ModuleFormType> = object()
  .shape({
    title: string().required(),
    description: string(),
    status: mixed().oneOf(Object.values(STATUS_ACTIVE)).required()
  })
  .required()
