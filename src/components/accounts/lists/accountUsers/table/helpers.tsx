/**
 * Components - Accounts - Lists - UserAccounts - Table
 */

import { MouseEvent, useContext } from 'react'

// Types
import { Column } from '../../../../../types/column'
import { User } from '../../../../../types/user'

import {
  Button,
  capitalize,
  formatDateStandard,
  OffCanvasContext,
  TableActions
} from '@drykiss/industry-ui'
import { THEME_CONTEXT } from '../../../../../constants/themeContext'
import { UserRow } from './types'
import { offCanvasType } from '../../../../../types/offCanvas'
import { UpsertUserForm } from '../../../../users/forms/upsert/upsert'
import { UserFormProps } from '../../../../users/forms/upsert/types'
import { generatePassword } from '../../../../../utils/passwordGenerator'

export const columns = (
  handleEdit: (_: MouseEvent<HTMLElement>, row: UserRow) => void,
  handleDelete: (_: MouseEvent<HTMLElement>, row: UserRow) => void
): Column<UserRow>[] => {
  return [
    {
      hidden: true,
      text: 'Id'
    },
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
      formatter: ({ row }) => capitalize(row?.status),
      text: 'Status'
    },
    {
      hidden: true,
      text: 'Custom Fields'
    },
    {
      formatter: TableActions,
      formatterData: [
        {
          context: THEME_CONTEXT.secondary,
          icon: ['fas', 'edit'],
          onClick: handleEdit,
          tooltip: 'Edit'
        },
        {
          context: THEME_CONTEXT.danger,
          icon: ['fas', 'trash'],
          onClick: handleDelete,
          tooltip: 'Delete'
        }
      ],
      text: 'Actions'
    }
  ]
}
export const rows = (users: User[]): UserRow[] => {
  return users?.map(
    (user: User): UserRow => ({
      id: user.id,
      name_first: user.name_first,
      name_last: user.name_last,
      // accountName:user.accounts.
      email: user.email,
      created_at: formatDateStandard(user.created_at),
      status: user.status,
      custom_fields: user.custom_fields,
      actions: ''
    })
  )
}

export const Toolbar = ({ filters, onSuccess }: UserFormProps) => {
  const randomPassword = generatePassword()

  const offCanvas = useContext<offCanvasType>(OffCanvasContext)

  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    offCanvas.show({
      content: (
        <UpsertUserForm
          filters={filters}
          onSuccess={onSuccess}
          defaultValues={{ password: randomPassword }}
        />
      ),
      submit: true,
      title: 'Add a User'
    })
  }

  return <Button context="white" onClick={handleClick} size="sm" content="Create a User" />
}
