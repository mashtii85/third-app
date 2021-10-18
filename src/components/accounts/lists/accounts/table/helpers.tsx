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

// Forms
import { Account, ACCOUNT_TYPE } from '../../../../../types/account'
import { Column } from '../../../../../types/column'

import { UpsertAccount } from '../../../forms'

import pages from '../../../../../config/pages'

// Types
import { AccountFilters } from '../../../types'
import { AccountsRow } from './types'
import { offCanvasType } from '../../../../../types/offCanvas'
// Constants
import { THEME_CONTEXT } from '../../../../../constants/themeContext'
import { generatePassword } from '../../../../../utils/passwordGenerator'

const actionsData = (handleEdit: (_: MouseEvent<HTMLElement>, row: AccountsRow) => void) => {
  return [
    {
      context: THEME_CONTEXT.secondary,
      icon: ['fas', 'edit'],
      onClick: handleEdit,
      tooltip: 'Edit'
    }
  ]
}

// Table Column
export const columns = (
  handleEdit: (_: MouseEvent<HTMLElement>, row: AccountsRow) => void
): Column<AccountsRow>[] => {
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

    {
      text: 'User'
    },
    {
      text: 'Verified',
      formatter: ({ row }) => (row?.verified ? 'Yes' : 'No' ?? 'No')
    },
    {
      text: 'Email'
    },
    {
      hidden: true
    },
    {
      text: 'Status',
      formatter: ({ row }) => capitalize(row.status)
    },
    {
      text: 'Created'
    },
    {
      formatter: TableActions,
      formatterData: actionsData(handleEdit),
      text: 'Actions'
    },
    {
      text: 'taxonomy',
      hidden: true
    },
    {
      text: 'custom_fields',
      hidden: true
    }
  ]
}

export const rows = (accounts?: Account[]): AccountsRow[] | [] => {
  const list: AccountsRow[] = []
  accounts?.forEach((account: Account) => {
    const taxonomy = account?.taxonomy && {
      label: account.taxonomy?.name!,
      value: account.taxonomy?.id?.toString() ?? ''
    }

    const user = account?.users[0]?.user ?? {}
    const model: AccountsRow = {
      id: account.id,
      userId: user?.id,
      name: account?.name,
      firstName: user?.name_first,
      lastName: user?.name_last,
      user: `${user?.name_first ?? ''} ${user?.name_last ?? ''}`,
      verified: user?.is_verified,
      email: user?.email,
      url: pages?.dashboard?.accounts?.view,
      status: account.status,
      created_at: formatDateStandard(account?.created_at),
      actions: '',
      taxonomy,
      custom_fields: account?.custom_fields
    }
    list.push(model)
  })

  return list ?? []
}

export const UserAccountToolbar = ({ filters }: { filters?: Partial<AccountFilters> }) => {
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)
  const caption = capitalize(filters?.userType)
  const randomPassword = generatePassword()
  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    offCanvas.show({
      content: (
        <UpsertAccount
          onSuccess={offCanvas.close}
          filters={filters}
          defaultValues={{ password: randomPassword }}
        />
      ),
      submit: true,
      title: `Add a ${caption}`
    })
  }

  return <Button context="white" onClick={handleClick} size="sm" content={`Create a ${caption}`} />
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
    type: accountType!,
    taxonomy: row.taxonomy,
    password
  }
}

export const isShowUser = ({ firstName, lastName, email }: AccountsRow): boolean =>
  !!(firstName || lastName || email)
