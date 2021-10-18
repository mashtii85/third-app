/**
 * Components - Accounts - Lists - Accounts - Table
 */

// React
import { MouseEvent, useContext } from 'react'
// UI
import { Details2, OffCanvasContext, Table } from '@drykiss/industry-ui'
import { useAccounts } from '../../../hooks'

// Types
import { AccountsRow, AccountTableProps } from './types'
import { offCanvasType } from '../../../../../types/offCanvas'

// Hooks
import { columns, rows, UserAccountToolbar, prepareAccountDefaultValues } from './helpers'
import { useTable } from '../../../../common/hooks/useTable'
import { UpsertAccount } from '../../../forms'

const initialSort = {}

export const AccountTable = ({ filters }: AccountTableProps) => {
  const { initialData, ref } = useTable({ filters, initialSort })

  const { accounts, loading } = useAccounts({
    filters: { ...initialData }
  })

  const offCanvas = useContext<offCanvasType>(OffCanvasContext)

  const handleEdit = (_: MouseEvent<HTMLElement>, row: AccountsRow) => {
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
          filters={filters}
        />
      ),
      submit: true,
      title: `Edit ${filters?.userType}`
    })
  }

  return (
    <Details2 open title="Accounts" toolbar={<UserAccountToolbar filters={filters} />}>
      <Table
        fullHeight
        align
        columns={columns(handleEdit)}
        loading={loading}
        rows={rows(accounts)}
        ref={ref}
      />
    </Details2>
  )
}
