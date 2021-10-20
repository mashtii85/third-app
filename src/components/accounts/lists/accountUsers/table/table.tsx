/**
 * Components - Accounts - Lists - UserAccounts - Table
 */

// React
import { MouseEvent, useContext } from 'react'

// UI
import { Details2, OffCanvasContext, Table } from '@drykiss/industry-ui'
import { useUsers } from '../../../../users/hooks'

// Types
import { UserTableProps } from '../../accounts/table/types'
import { columns, rows, Toolbar } from './helpers'
import { useTable } from '../../../../common/hooks/useTable'
import { UsersFilter } from '../../../types'
import { offCanvasType } from '../../../../../types/offCanvas'
import { UserRow } from './types'
import { DeleteUserForm, UpsertUserForm } from '../../../../users/forms'

const initialSort = {}

export const AccountUsersTable = ({ filters }: UserTableProps) => {
  const { initialData, ref } = useTable<UsersFilter>({ filters, initialSort })
  const { users, loading } = useUsers({
    filters: initialData
  })

  const offCanvas = useContext<offCanvasType>(OffCanvasContext)

  const handleEdit = (_: MouseEvent<HTMLElement>, row: UserRow) => {
    const { actions, ...defaultValues } = row

    console.log(actions)
    offCanvas.show({
      content: (
        <UpsertUserForm
          defaultValues={defaultValues}
          filters={initialData}
          onSuccess={offCanvas.close}
        />
      ),
      submit: true,
      title: 'Edit User'
    })
  }

  const handleDelete = (_: MouseEvent<HTMLElement>, row: UserRow): void => {
    const userName = `${row.name_first} ${row.name_last}`

    offCanvas.show({
      content: (
        <DeleteUserForm
          id={row.id!}
          userName={userName}
          onSuccess={offCanvas.close}
          filters={initialData}
        />
      ),
      submit: false,
      title: 'Remove User'
    })
  }

  return (
    <Details2
      open
      title="Users"
      toolbar={<Toolbar onSuccess={offCanvas.close} filters={initialData} />}
    >
      <Table
        fullHeight
        align
        columns={columns(handleEdit, handleDelete)}
        loading={loading}
        rows={rows(users)}
        ref={ref}
      />
    </Details2>
  )
}
