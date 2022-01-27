/**
 * Components - Taxonomy - Forms - Upsert - Schema
 */

// Yup
import { object, string, SchemaOf } from 'yup'

// Types
import { Taxonomy } from '@availabletowork/types'

export const TaxonomySchema: SchemaOf<Taxonomy> = object()
  .shape({
    name: string().required(),
    status: string().oneOf(['active', 'inactive']).required()
  })
  .required()
