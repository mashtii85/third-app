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
    type: accountType
  }

  if (form.add_contact_user) {
    const user = {
      data: {
        email: form.email,
        name_first: form.firstName,
        name_last: form.lastName,
        password: hashPassword(form.password),
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
  accountId
}: {
  form: CreateAccountForm
  accountId: number
}): LooseObject => {
  const variables: LooseObject = {
    accountId,
    status: form.status,
    accountSet: {
      name: form.name,
      status: form.status,
      taxonomy_id: form.taxonomy.value,
      custom_fields: form.custom_fields
    }
  }

  if (form.add_contact_user) {
    variables.hasUser = true
    variables.userObject = {
      accounts: { data: { account_id: accountId, status: form.status } },
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
