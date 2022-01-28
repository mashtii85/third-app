/**
 * Components - Users - Accounts
 */

// React
import { useContext } from 'react'

// UI
import { AuthorizationContext, Details, Table } from '@drykiss/industry-ui'

// Constants
import { ACCOUNT_TYPE } from '@availabletowork/constants'

// Helpers
import { columns, rows } from './helpers'

// Types
import { UserAccountTableProps } from '@availabletowork/types'

export const UserAccountsTable = ({ user, loading }: UserAccountTableProps) => {
  const { hasRole } = useContext(AuthorizationContext)
  const isNotAdmin = !hasRole(ACCOUNT_TYPE.Admin)

  return (
    <Details open title="Accounts">
      <Table
        columns={columns({ isNotAdmin })}
        rows={rows({ accounts: user.accounts })}
        loading={loading}
      />
    </Details>
  )
}
