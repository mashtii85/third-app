/**
 * Components - Users - Schema
 */

// Yup
import { object, string } from 'yup'
const phoneRegex = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/
export const usersSchema = object().shape({
  name_first: string().required(),
  name_last: string().required(),
  email: string().required().email(),
  status: string().oneOf(['active', 'inactive']).required(),
  custom_fields: object().test('matches', 'Incorrect phone number', ({ phone }: any) => {
    return phone.length === 0 || phoneRegex.test(phone)
  })
})
