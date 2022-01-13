/**
 * Components - Accounts - Settings - Theme - Brand - Schema
 */

// Yup
import { object, string, SchemaOf } from 'yup'

// Types
import { BrandFormType } from './types.d'

export const BrandSchema: SchemaOf<BrandFormType> = object().shape({
  name: string().required()
})
