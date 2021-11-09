/**
 * Components - Users - Forms - Upsert - Schema
 */

// Yup
import { mixed, object, SchemaOf, string } from 'yup'
import { passwordRegex, phoneNumberRegex } from '../../../../constants/regex'
import { STATUS_ACTIVE } from '../../../../types/select.d'
import { UserForm } from './types'

export const usersSchema: SchemaOf<UserForm> = object().shape({
  name_first: string().required(),
  name_last: string().required(),
  email: string().required().email(),
  status: mixed().oneOf(Object.values(STATUS_ACTIVE)),
  phone: string().test('matches', 'Incorrect phone number', (phoneNumber: any) => {
    return phoneNumber.length === 0 || phoneNumberRegex.test(phoneNumber)
  }),
  password: string()
    .required('password is required')
    .matches(
      passwordRegex,
      `Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character`
    )
})
