/**
 * Components - Accounts - Form - Schema
 */

// Yup
import { bool, object, string } from 'yup'
import { passwordRegex, phoneNumberRegex } from '../../../../constants/regex'

export const AccountSchema = object().shape({
  add_contact_user: bool(),
  name: string().required(),
  status: string().required(),
  firstName: string().when('add_contact_user', {
    is: true,
    then: string().required()
  }),
  lastName: string().when('add_contact_user', {
    is: true,
    then: string().required()
  }),
  email: string().when('add_contact_user', {
    is: true,
    then: string().required()
  }),
  password: string().when('add_contact_user', {
    is: true,
    then: string()
      .required('password is required')
      .matches(
        passwordRegex,
        `Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character`
      )
  }),
  phone: string().test('matches', 'Incorrect phone number', (phoneNumber: any) => {
    return phoneNumber.length === 0 || phoneNumberRegex.test(phoneNumber)
  }),
  taxonomy: object().shape({
    label: string(),
    value: string()
  })
})
