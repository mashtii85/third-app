/**
 * Components - Users - Accounts - Helpers
 */

// UI
import { capitalize, TableActions, TableLink } from '@drykiss/industry-ui'

// Types
import { AccountProfileRows, AccountUsers, Column } from '@availabletowork/types'

// Constants
import { THEME_CONTEXT } from '@availabletowork/types'

export const columns = ({ isNotAdmin }: { isNotAdmin: boolean }): Column<AccountProfileRows>[] => {
  return [
    {
      text: 'Id',
      hidden: true
    },
    {
      formatter: TableLink('', 'accountId', 'name', 'url'),
      text: 'Account'
    },
    {
      text: 'Status',
      formatter: ({ row }): string => capitalize(row.status)
    },

    {
      hidden: true,
      text: 'Account ID'
    },

    {
      text: 'Url',
      hidden: true
    },
    {
      text: 'accountSelected',
      hidden: true
    },
    {
      hidden: isNotAdmin,
      formatter: TableActions,
      formatterData: [
        {
          context: THEME_CONTEXT.secondary,
          icon: ['fas', 'edit'],
          tooltip: 'Edit'
        }
      ],
      text: 'Actions'
    }
  ]
}

export const rows = ({ accounts = [] }: { accounts?: AccountUsers[] }): AccountProfileRows[] => {
  const rows = accounts
    .filter((item: AccountUsers) => item !== null)
    .map((item: AccountUsers) => ({
      id: item.id,
      name: item.account.name,
      // position: item?.account_user?.custom_fields?.position || '-',
      status: item.status,
      accountId: item.account.id,
      // todo:this url does not work
      url:
        item.account.type.toLowerCase() === 'tenant'
          ? ''
          : `/dashboard/${item.account.type.toLowerCase()}s/view`,
      accountSelected: {
        label: item.account.name,
        type: item.account.type,
        value: item.account.id
      },
      actions: ''
    }))

  return rows
}
