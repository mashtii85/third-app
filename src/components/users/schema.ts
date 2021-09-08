/**
 * Components - Users - Schema
 */

// Yup
import { object, string } from 'yup'

export const usersSchema = object().shape({
  name_first: string().required(),
  name_last: string().required(),
  email: string().required().email(),
  status: string().oneOf(['active', 'inactive']).required(),
  custom_fields: object().shape({
    phone: string()
      .trim()
      .matches(
        /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
        'Incorrect phone number'
      )
  })
})
