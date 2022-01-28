/**
 * Components - Accounts - Lists - Accounts - Table - Helpers
 */

// React
import { MouseEvent, useContext } from 'react'

import {
  Button,
  capitalize,
  formatDateStandard,
  OffCanvasContext,
  TableActions,
  TableLink
} from '@drykiss/industry-ui'

// Utils
import { formatToValidDate } from '../../../../../utils/dateFormatter'

// Constants
import { ACCOUNT_TYPE, pages, THEME_CONTEXT } from '@availabletowork/constants'

// Types
import {
  Account,
  AccountFilters,
  AccountsRow,
  Column,
  offCanvasType,
  User
} from '@availabletowork/types'

import { UpsertAccount } from '../../../forms'
import { generatePassword } from '../../../../../utils/passwordGenerator'

const actionsData = ({
  handleEdit,
  handleDelete,
  handleGroups
}: {
  handleEdit: (_: MouseEvent<HTMLElement>, row: AccountsRow) => void
  handleDelete: (_: MouseEvent<HTMLElement>, row: AccountsRow) => void
  handleGroups: () => void
}) => {
  return [
    {
      context: THEME_CONTEXT.secondary,
      icon: ['fas', 'edit'],
      onClick: handleEdit,
      tooltip: 'Edit'
    },
    {
      context: THEME_CONTEXT.black,
      icon: ['fas', 'users'],
      onClick: handleGroups,
      tooltip: 'Groups'
    },
    {
      context: THEME_CONTEXT.danger,
      icon: ['fas', 'trash'],
      onClick: handleDelete,
      tooltip: 'Delete'
    }
  ]
}

// Table Column
export const columns = ({
  handleEdit,
  handleDelete,
  handleGroups
}: {
  handleEdit: (_: MouseEvent<HTMLElement>, row: AccountsRow) => void
  handleDelete: (_: MouseEvent<HTMLElement>, row: AccountsRow) => void
  handleGroups: () => void
}): Column<AccountsRow>[] => {
  return [
    {
      text: 'id',
      hidden: true
    },
    {
      text: 'userId',
      hidden: true
    },
    {
      formatter: TableLink('', 'id', 'name', 'url'),
      text: 'Name'
    },
    {
      text: 'First Name',
      hidden: true
    },
    {
      text: 'Last Name',
      hidden: true
    },
    { text: 'User' },
    { text: 'Type' },
    {
      text: 'Verified',
      formatter: ({ row }) => (row?.verified ? 'Yes' : 'No' ?? 'No')
    },
    { text: 'Email' },
    { hidden: true },
    {
      text: 'Status',
      formatter: ({ row }) => capitalize(row.status)
    },
    {
      text: 'Created'
    },
    {
      formatter: TableActions,
      formatterData: actionsData({ handleEdit, handleDelete, handleGroups }),
      text: 'Actions'
    },
    {
      text: 'taxonomy',
      hidden: true
    },
    {
      text: 'custom_fields',
      hidden: true
    },
    {
      text: 'meta',
      hidden: true
    }
  ]
}

export const rows = (accounts?: Account[]): AccountsRow[] | [] => {
  const list: AccountsRow[] = []
  accounts?.forEach((account: Account) => {
    const taxonomy = account?.taxonomy && {
      label: account.taxonomy?.name ?? '',
      value: account.taxonomy?.id?.toString() ?? ''
    }

    const user: Partial<User> = account?.users[0]?.user ?? {}
    const model = {
      id: account.id,
      userId: user?.id,
      name: account?.name,
      firstName: user?.name_first,
      lastName: user?.name_last,
      user: `${user?.name_first ?? ''} ${user?.name_last ?? ''}`,
      memberType: taxonomy?.label,
      verified: user?.email_verified,
      email: user?.email,
      url: pages?.dashboard?.accounts?.view,
      status: account.status,
      created_at: formatDateStandard(account?.created_at),
      actions: '',
      taxonomy,
      custom_fields: account?.custom_fields,
      meta: account?.meta
    }
    list.push(model)
  })

  return list ?? []
}

export const UserAccountToolbar = ({ filters }: { filters?: Partial<AccountFilters> }) => {
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)
  const caption = capitalize(filters?.userType ?? '')
  const randomPassword = generatePassword()
  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    offCanvas.show({
      content: (
        <UpsertAccount
          onSuccess={offCanvas.close}
          filters={filters}
          defaultValues={{
            password: randomPassword,
            meta: { locations: false, events: false, learning: false }
          }}
        />
      ),
      submit: true,
      title: `Add a ${caption}`
    })
  }

  return (
    <div data-cy="create-member-button">
      <Button context="white" onClick={handleClick} size="sm" content={`Create a ${caption}`} />
    </div>
  )
}

export const prepareAccountDefaultValues = ({
  row,
  accountId,
  accountType
}: {
  row: AccountsRow
  accountId?: number
  accountType?: ACCOUNT_TYPE
}): AccountsRow => {
  const password = !row.id || !row?.userId ? generatePassword() : undefined
  return {
    ...row,
    add_contact_user: isShowUser(row),
    custom_fields: formatToValidDate(row?.custom_fields),
    client_id: accountId,
    type: accountType,
    taxonomy: row.taxonomy,
    password
  }
}

export const isShowUser = ({ firstName, lastName, email }: AccountsRow): boolean =>
  !!(firstName || lastName || email)
