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
import { Column } from '../../../../types/column.d'
import { TableProps, UserAccount } from './types.d'
import { Account } from '../../../../types/account.d'

import pages from '../../../../config/pages'

export const AccountTable = ({ title }: TableProps) => {
  const {
    user: { id: clientId = 0 }
  } = useContext(UserContext)

  // Table Column
  const columns: Column<Account>[] = [
    { hidden: true },
    {
      formatter: TableLink('', 'id', 'name', 'url'),
      text: 'Name'
    },
    {
      hidden: true
    },
    {
      text: 'Status'
    },
    {
      text: 'Created'
    }
  ]

  const { accounts = [], loading = true } = useAccounts({
    clientId
  })

  const rows = () =>
    accounts.map((account: UserAccount) => {
      return {
        id: account.id,
        name: account.name,
        url: pages.dashboard.accounts.view,
        status: capitalize(account.status),
        created: formatDateStandard(account.created_at)
      }
    })

  return (
    <Details2 open title={title}>
      <Table fullHeight align columns={columns} loading={loading} rows={rows()} />
    </Details2>
  )
}
