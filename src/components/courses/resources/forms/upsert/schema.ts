/**
 * Components - Course - Resources - Forms - Create - Schema
 */

// Yup
import { object, string, SchemaOf } from 'yup'

// Types
import { ResourcesFormType } from './types.d'

export const ResourcesSchema: SchemaOf<ResourcesFormType> = object()
  .shape({
    title: string().required()
  })
  .required()
