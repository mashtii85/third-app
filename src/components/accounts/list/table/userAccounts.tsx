/**
 * Components - Taxonomy - List - Table
 */
// UI
import { capitalize, Details2, formatDateStandard, Table } from '@drykiss/industry-ui'
import { useUserAccounts } from '../../hooks/useUserAccounts'
// Types
import { Column } from '../../../../types/column'
import { UserAccount, UserTableProps } from './types'
import { User } from '../../../../types/user.d'

export const UserAccounts = ({ title, accountId, type }: UserTableProps) => {
  // Table Column
  const columns: Column<User>[] = [
    {
      text: 'First Name'
    },
    {
      text: 'Last Name'
    },
    {
      text: 'Email'
    },
    {
      text: 'Created'
    },
    {
      text: 'Status'
    }
  ]

  const { users = [], loading = true } = useUserAccounts({
    accountId,
    type
  })

  const rows = () =>
    users.map(({ user }: UserAccount) => {
      return {
        accountId: user.name_first,
        name: user.name_last,
        email: user.email,
        created: formatDateStandard(user.created_at),
        status: capitalize(user.status)
      }
    })

  return (
    <Details2 open title={title}>
      <Table fullHeight align columns={columns} loading={loading} rows={rows()} />
    </Details2>
  )
}
