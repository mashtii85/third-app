/**
 * Components - Accounts - Lists - Accounts - Table
 */

// React
import { MouseEvent, useContext } from 'react'

// UI
import { capitalize, Details, OffCanvasContext, Table } from '@drykiss/industry-ui'
import { useAccounts } from '../../../hooks'

// Hooks
import { columns, rows, UserAccountToolbar, prepareAccountDefaultValues } from './helpers'
import { useTable } from '../../../../common/hooks/useTable'
import { DeleteAccountForm, UpsertAccount } from '../../../forms'
import { GroupEntitiesTable } from '../../../../groupEntities/table/table'
import { ENTITIES } from '../../../../../constants/entities'

// Types
import { AccountsRow, AccountTableProps } from './types.d'
import { offCanvasType } from '../../../../../types/offCanvas.d'
import { CLIENT_MODULE_TYPE } from '../../../forms/upsert/types.d'

const initialSort = {}

export const AccountTable = ({ filters }: AccountTableProps) => {
  const { initialData, ref } = useTable({ filters, initialSort })

  const { accounts, loading } = useAccounts({
    filters: initialData
  })

  const offCanvas = useContext<offCanvasType>(OffCanvasContext)

  const handleEdit = (_: MouseEvent<HTMLElement>, row: AccountsRow) => {
    const clientModules: string[] = []
    Object.keys(CLIENT_MODULE_TYPE).forEach((key) => {
      const keyname = key.toLocaleLowerCase()
      if (row?.meta && row?.meta[keyname] === true) clientModules.push(keyname)
    })
    row.clientModules = [...clientModules]
    const defaultValues = prepareAccountDefaultValues({
      row,
      accountId: filters?.accountId,
      accountType: filters?.accountType
    })

    offCanvas.show({
      content: (
        <UpsertAccount
          onSuccess={offCanvas.close}
          defaultValues={defaultValues}
          filters={initialData}
        />
      ),
      submit: true,
      title: `Edit ${capitalize(filters?.userType ?? '')}`
    })
  }

  const handleDelete = (_: MouseEvent<HTMLElement>, row: AccountsRow) => {
    offCanvas.show({
      content: (
        <DeleteAccountForm
          accountName={row.name}
          onSuccess={offCanvas.close}
          filters={initialData}
          id={row.id}
        />
      ),
      submit: false,
      title: 'Delete Account'
    })
  }

  const handleShowGroupEntities = () => {
    offCanvas.show({
      content: <GroupEntitiesTable entity={ENTITIES.Account} entityId={filters?.accountId} />,
      submit: false,
      title: 'Groups'
    })
  }

  return (
    <Details open title="Accounts" toolbar={<UserAccountToolbar filters={initialData} />}>
      <Table
        fullHeight
        align
        columns={columns({ handleEdit, handleDelete, handleGroups: handleShowGroupEntities })}
        loading={loading}
        rows={rows(accounts)}
        ref={ref}
      />
    </Details>
  )
}
