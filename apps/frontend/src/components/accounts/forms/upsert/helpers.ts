/**
 * Components - Accounts - Form
 */

import { hashPassword } from '../../../../services/auth/helpers'
import { ACCOUNT_TYPE } from '../../../../types/account'
import { LooseObject } from '../../../../types/object'
import { CreateAccountForm } from './types'

export const prepareCreateAccount = (
  form: CreateAccountForm,
  accountType?: ACCOUNT_TYPE,
  accountId?: number
): LooseObject => {
  const data: LooseObject = {
    name: form.name,
    status: form.status,
    custom_fields: form.custom_fields,
    taxonomy_id: form.taxonomy.value,
    client_id: accountId,
    type: accountType,
    meta: form.meta
  }

  if (form.add_contact_user) {
    const user = {
      data: {
        email: form.email,
        name_first: form.firstName,
        name_last: form.lastName,
        password: hashPassword(form.password),
        phone: form.phone,
        status: form.status
      }
    }
    data.users = {
      data: {
        status: form.status,
        user
      }
    }
  }

  return data
}

export const prepareUpdateAccount = ({
  form,
  accountId,
  hasUser
}: {
  form: CreateAccountForm
  accountId: number
  hasUser: boolean
}): LooseObject => {
  const variables: LooseObject = {
    accountId,
    status: form.status,
    accountSet: {
      name: form.name,
      status: form.status,
      taxonomy_id: form.taxonomy.value,
      custom_fields: form.custom_fields,
      meta: form.meta
    }
  }

  if (form.add_contact_user && !hasUser) {
    variables.hasUser = true
    variables.userObject = {
      accounts: { data: { account_id: accountId, status: form.status } },
      phone: form.phone,
      email: form.email,
      name_first: form.firstName,
      name_last: form.lastName,
      status: form.status,
      password: hashPassword(form.password),
      taxonomy_id: form.taxonomy.value
    }
  } else {
    variables.hasUser = false
  }

  return variables
}
