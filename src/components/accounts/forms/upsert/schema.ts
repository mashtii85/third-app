/**
 * Components - Accounts - Form - Schema
 */

// Yup
import { object, string } from 'yup'
import { STATUS_ACTIVE } from '../../../../types/select.d'

export const AccountSchema = object().shape({
  name: string().when('add_contact_user', {
    is: true,
    then: string().required()
  }),
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
  status: string().when('add_contact_user', {
    is: true,
    then: string().oneOf([STATUS_ACTIVE.Active, STATUS_ACTIVE.Inactive]).required()
  }),
  taxonomy: object().shape({
    label: string(),
    value: string()
  })
})
