/**
 * Components - Taxonomy - Form - Schema
 */

// Yup
import { object, string } from 'yup'
import { STATUS_ACTIVE } from '../../../types/select'

export const AccountSchema = () => {
  return object().shape({
    name: string().required(),
    status: string().oneOf([STATUS_ACTIVE.Active, STATUS_ACTIVE.Inactive]).required()
  })
}
