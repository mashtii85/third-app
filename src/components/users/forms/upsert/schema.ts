/**
 * Components - Users - Forms - Upsert - Schema
 */

// Yup
import { mixed, object, SchemaOf, string } from 'yup'
import { STATUS_ACTIVE } from '../../../../types/select.d'
import { UserForm } from './types'
const phoneNumberRegex =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

export const usersSchema: SchemaOf<UserForm> = object().shape({
  name_first: string().required(),
  name_last: string().required(),
  email: string().required().email(),
  status: mixed().oneOf(Object.values(STATUS_ACTIVE)),
  phone: string().test('matches', 'Incorrect phone number', (phoneNumber: any) => {
    return phoneNumber.length === 0 || phoneNumberRegex.test(phoneNumber)
  }),
  password: string()
})
