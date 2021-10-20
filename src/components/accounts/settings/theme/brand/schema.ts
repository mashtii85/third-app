/**
 * Components - Accounts - Settings - Theme - Brand - Schema
 */

// Yup
import { object, string } from 'yup'

export const BrandSchema = object().shape({
  name: string().required()
})
