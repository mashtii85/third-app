/**
 * Components - Taxonomy - Form - Schema
 */

// Yup
import { object, string } from 'yup'

export const TaxonomySchema = () => {
  return object().shape({
    name: string().required(),
    status: string().oneOf(['active', 'inactive']).required()
  })
}
