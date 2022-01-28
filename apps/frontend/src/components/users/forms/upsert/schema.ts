/**
 * Components - Users - Forms - Upsert - Schema
 */

// Yup
import { bool, mixed, object, SchemaOf, string } from 'yup'
import { passwordRegex, phoneNumberRegex } from '../../../../constants/regex'

// Constants
import { localesOptions, STATUS_ACTIVE } from '@availabletowork/constants'

// Types
import { UserForm } from '@availabletowork/types'

export const usersSchema = (hasPassword: boolean): SchemaOf<UserForm> => {
  const password = hasPassword
    ? string()
        .required('password is required')
        .matches(
          passwordRegex,
          `Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character`
        )
    : string().matches(
        passwordRegex,
        `Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character`
      )

  return object().shape({
    name_first: string().required(),
    name_last: string().required(),
    email: string().required().email(),
    meta: object().shape({
      locale: mixed().oneOf(Object.values(localesOptions)),
      notifications: object().shape({
        alert: bool(),
        email: bool(),
        push: bool(),
        sms: bool()
      })
    }),
    status: mixed().oneOf(Object.values(STATUS_ACTIVE)),
    phone: string().test('matches', 'Incorrect phone number', (phoneNumber: any) => {
      return phoneNumber.length === 0 || phoneNumberRegex.test(phoneNumber)
    }),
    password
  })
}
