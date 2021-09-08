/**
 * Components - Users - Schema
 */

// Yup
import { object, string } from 'yup'

export const usersSchema = object().shape({
  name_first: string().required(),
  name_last: string().required(),
  email: string().required().email(),
  status: string().oneOf(['active', 'inactive']).required()
})
