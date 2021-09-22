/**
 * Components - Create - Account - Form
 */
// Next
import Router from 'next/router'
// React
import { useContext } from 'react'

import { AccountForm } from '../form/form'
import { UserContext } from '@drykiss/industry-ui'
import pages from '../../../config/pages'
const CreateAccount = () => {
  const {
    user: { id: clientId = 0, status, account_type: accountType = '' }
  } = useContext(UserContext)

  const handleSuccess = (data: any): void => {
    const [account] = data?.insert_account?.returning
    Router.push(`${pages.dashboard.accounts.view}?id=${account.id}`)
  }
  return (
    <AccountForm
      defaultValues={{ clientId, type: accountType, status }}
      onSuccess={handleSuccess}
    />
  )
}

export default CreateAccount
