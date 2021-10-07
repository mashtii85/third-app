/**
 * Components - Lessons - Questions - Form - Upsert - Schema
 */

// Yup
import { object, string } from 'yup'

export const TaxonomySchema = object()
  .shape({
    name: string().required(),
    status: string().oneOf(['active', 'inactive']).required()
  })
  .required()
