/**
 * Components - Accounts - Lists - UserAccounts - Table
 */

import { MouseEvent, useContext } from 'react'

// Types
import { Column, offCanvasType, UserFormProps, User, UserRow } from '@availabletowork/types'

// UI
import {
  Button,
  capitalize,
  formatDateStandard,
  OffCanvasContext,
  TableActions
} from '@drykiss/industry-ui'
import { UpsertUserForm } from '../../../../users/forms/upsert/upsert'

// Constants
import { THEME_CONTEXT } from '@availabletowork/types'

// Utils
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
      hidden: true,
      text: 'Phone'
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
      phone: user.phone,
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

  return (
    <div data-cy="create-user-button">
      <Button context="white" onClick={handleClick} size="sm" content="Create a User" />
    </div>
  )
}
