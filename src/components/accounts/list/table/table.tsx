/**
 * Components - Taxonomy - List - Table
 */
// React
import { useContext } from 'react'
// UI
import {
  UserContext,
  capitalize,
  Details2,
  formatDateStandard,
  Table,
  TableLink
} from '@drykiss/industry-ui'
import { useAccounts } from '../../hooks/useAccounts'
// Types
import { Column } from '../../../../types/column'
import { TableProps, UserAccount } from './types'
import { Account } from '../../../../types/account'

export const AccountTable = ({ title }: TableProps) => {
  // Table Column
  const columns: Column<Account>[] = [
    { hidden: true },
    {
      formatter: TableLink('', 'accountId', 'name', 'url'),
      text: 'Name'
    },
    {
      hidden: true
    },
    {
      text: 'Type'
    },
    {
      text: 'Created'
    },
    {
      text: 'Status'
    }
  ]
  const {
    user: { id: clientId = 0 }
  } = useContext(UserContext)

  const { accounts = [], loading = true } = useAccounts({
    clientId
  })

  const rows = () =>
    accounts.map(({ account }: UserAccount) => {
      return {
        accountId: account.id,
        name: account.name,
        url: `/dashboard/accounts/view`,
        type: account.type,
        created: formatDateStandard(account.created_at),
        status: capitalize(account.status)
      }
    })

  return (
    <Details2 open summary={title}>
      <Table fullHeight align columns={columns} loading={loading} rows={rows()} />
    </Details2>
  )
}
