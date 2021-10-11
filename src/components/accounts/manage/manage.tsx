/**
 * Components - Create - Account - Form
 */

// Next
import Router from 'next/router'

// UI
import { UpsertAccount } from '../forms'
import pages from '../../../config/pages'
import { ACCOUNT_TYPE } from '../../../types/account.d'
import { useCurrentUser } from '../../../utils/useCurrentUser'

const CreateAccount = () => {
  const {
    user: { id: clientId = 0, account_type: accountType = ACCOUNT_TYPE.Member }
  } = useCurrentUser()
  // const isAdmin = accountType === ACCOUNT_TYPE.Admin
  console.log(accountType)
  const handleSuccess = (data: any): void => {
    const [account] = data?.insert_account?.returning
    Router.push(`${pages.dashboard.accounts.view}?id=${account.id}`)
  }

  return (
    <UpsertAccount
      // isAdmin={isAdmin}
      filters={{
        limit: 20,
        offset: 0,
        order_by: { created_at: 'asc' },
        accountId: clientId
        // type: accountType
      }}
      onSuccess={handleSuccess}
    />
  )
}

export default CreateAccount
