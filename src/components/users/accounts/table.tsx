/**
 * Components - Users - Accounts
 */

// React
import { useContext } from 'react'

// UI
import { AuthorizationContext, Details2, Table } from '@drykiss/industry-ui'

// Constants
import { columns, rows } from './helpers'

// Types
import { UserAccountTableProps } from './types'

export const UserAccountsTable = ({ user, loading }: UserAccountTableProps) => {
  const { hasRole } = useContext(AuthorizationContext)
  const isNotAdmin = !hasRole('admin')

  return (
    <Details2 open title="Accounts">
      <Table
        columns={columns({ isNotAdmin })}
        rows={rows({ accounts: user.accounts })}
        loading={loading}
      />
    </Details2>
  )
}
