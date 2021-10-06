/**
 * Components - Taxonomy - List - Table
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

// Forms
import { Account, ACCOUNT_TYPE } from '../../../../types/account'
import { Column } from '../../../../types/column'

import { AccountForm } from '../../form/form'

import pages from '../../../../config/pages'

// Types
import { AccountFilters } from '../../types.d'
import { AccountsRow } from './types.d'
import { offCanvasType } from '../../../../types/offCanvas'

// Constants
import { THEME_CONTEXT } from '../../../../constants/themeContext'

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
    if (account?.users?.length > 0) {
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
        url: pages.dashboard.accounts.view,
        status: account.status,
        created: formatDateStandard(account.created_at),
        actions: '',
        taxonomy: account.taxonomy,
        custom_fields: account.custom_fields
      }
      list.push(model)
    }
  })

  return list ?? []
}

export const UserAccountToolbar = ({
  filters,
  type,
  clientId,
  isAdminUser
}: {
  filters?: Partial<AccountFilters>
  clientId: number
  isAdminUser: boolean
  type: ACCOUNT_TYPE
}) => {
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)
  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    offCanvas.show({
      content: (
        <AccountForm
          onSuccess={offCanvas.close}
          filters={filters}
          isAdminUser={isAdminUser}
          defaultValues={{
            client_id: clientId,
            type
          }}
        />
      ),
      submit: true,
      title: `Add A ${type}`
    })
  }

  return <Button context="white" onClick={handleClick} size="sm" content={`Create a ${type}`} />
}
