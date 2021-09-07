/**
 * Components - Users - View - Accounts
 */

// React
import { useContext } from 'react'

// UI
import {
  AuthorizationContext,
  capitalize,
  Details,
  Table,
  TableActions,
  TableLink
} from '@drykiss/industry-ui'

// Types
import type { User, AccountUsers } from '../../../types/user'

interface UserAccountTableProps {
  user: User
}

export const UserAccountsTable = ({ user }: UserAccountTableProps) => {
  const { hasRole } = useContext(AuthorizationContext)

  const userDetail: User = Object.assign({}, user)

  userDetail.name = `${userDetail.name_first} ${userDetail.name_last}`

  const columns = [
    {
      hidden: true
    },
    {
      formatter: TableLink('', 'accountId', 'name', 'url'),
      text: 'Account'
    },
    {
      text: 'Type'
    },
    {
      text: 'Position'
    },
    {
      text: 'Status'
    },
    {
      hidden: true
    },
    {
      hidden: !hasRole('admin'),
      formatter: TableActions,
      formatterData: [
        {
          context: 'secondary',
          icon: ['fas', 'edit'],
          tooltip: 'Edit'
        }
      ],
      text: 'Actions'
    },
    {
      hidden: true
    },
    {
      hidden: true
    }
  ]

  const rows = () =>
    (userDetail.account_users || [])
      .filter((item: AccountUsers) => item !== null)
      .map((item: AccountUsers) => ({
        id: item.id,
        name: item.account.name,
        type: capitalize(item.account.type),
        status: capitalize(item.status),
        accountId: item.account.id,
        actions: '',
        url:
          item.account.type.toLowerCase() === 'tenant'
            ? ''
            : `/dashboard/${item.account.type.toLowerCase()}s/view`,
        accountSelected: {
          label: item.account.name,
          type: item.account.type,
          value: item.account.id
        }
      }))

  return (
    <Details open summary="Accounts">
      <Table columns={columns} rows={rows()} />
    </Details>
  )
}
