/**
 * Components - Create - Account - Form
 */
// Next
import Router from 'next/router'
// React
import { useContext } from 'react'

import { AccountForm } from '../form/form'
import { Details2, UserContext } from '@drykiss/industry-ui'
import pages from '../../../config/pages.json'
const CreateAccount = () => {
  const {
    user: { id: clientId = 0, status, account_type: accountType = '' }
  } = useContext(UserContext)

  const handleSuccess = (data: any): void => {
    const [account] = data?.insert_account?.returning
    Router.push(`${pages.dashboard.accounts.view}?id=${account.id}`)
  }
  return (
    <Details2 title="Create Account" open>
      <AccountForm
        defaultValues={{ clientId, type: accountType, status }}
        onSuccess={handleSuccess}
      />
    </Details2>
  )
}

export default CreateAccount
