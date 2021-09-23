/**
 * Components - Create - Account - Form
 */
// Next
import Router from 'next/router'
// // React
import { useContext } from 'react'
import { UserContext } from '@drykiss/industry-ui'

import { AccountForm } from '../form/form'
import pages from '../../../config/pages'
import { ACCOUNT_TYPE } from '../../../types/account.d'

const CreateAccount = () => {
  const {
    user: { id: clientId = 0, account_type: accountType = ACCOUNT_TYPE.Member }
  } = useContext(UserContext)

  const handleSuccess = (data: any): void => {
    const [account] = data?.insert_account?.returning
    Router.push(`${pages.dashboard.accounts.view}?id=${account.id}`)
  }

  return (
    <AccountForm
      // defaultValues={{ status }}
      filters={{
        limit: 20,
        offset: 0,
        orderBy: { created_at: 'asc' },
        accountId: clientId,
        type: accountType
      }}
      onSuccess={handleSuccess}
    />
  )
}

export default CreateAccount
