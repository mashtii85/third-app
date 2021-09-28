/**
 * Components - Accounts - List - Table
 */

// React
import { MouseEvent, useContext } from 'react'
// UI
import { Details2, OffCanvasContext, Table } from '@drykiss/industry-ui'
import { useAccounts } from '../../hooks'

// Types
import { AccountsRow, AccountTableProps } from './types.d'
import { offCanvasType } from '../../../../types/offCanvas'

import { columns, rows, UserAccountToolbar } from './helpers'
import { useTable } from '../../../common/hooks/useTable'
import { AccountForm } from '../../form/form'

const initialSort = {}

export const AccountTable = (props: AccountTableProps) => {
  const { initialData, ref } = useTable({ filters: props.filters, initialSort })
  const { accounts, loading } = useAccounts({ filters: initialData })

  const offCanvas = useContext<offCanvasType>(OffCanvasContext)

  const handleEdit = (_: MouseEvent<HTMLElement>, row: AccountsRow) => {
    offCanvas.show({
      content: (
        <AccountForm onSuccess={offCanvas.close} defaultValues={row} filters={props.filters} />
      ),
      submit: true,
      title: `Edit ${props.filters?.type}`
    })
    console.log(row)
  }

  return (
    <Details2 open title={props.title} toolbar={<UserAccountToolbar filters={props.filters} />}>
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
