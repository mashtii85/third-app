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
// Hooks
import { columns, rows, UserAccountToolbar } from './helpers'
import { useTable } from '../../../common/hooks/useTable'
import { AccountForm } from '../../form/form'
import { useCurrentUser } from '../../../../utils/useCurrentUser'
import { ACCOUNT_TYPE } from '../../../../types/account.d'
const initialSort = {}

export const AccountTable = (props: AccountTableProps) => {
  const { user } = useCurrentUser()
  const accountType =
    user.account_type === ACCOUNT_TYPE.Admin ? ACCOUNT_TYPE.Client : ACCOUNT_TYPE.Member
  const clientId = user.id
  const { initialData, ref } = useTable({ filters: props.filters, initialSort })

  const { accounts, loading } = useAccounts({
    filters: { ...initialData, type: accountType, clientId }
  })
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)

  const handleEdit = (_: MouseEvent<HTMLElement>, row: AccountsRow) => {
    const { taxonomy } = row
    offCanvas.show({
      content: (
        <AccountForm
          onSuccess={offCanvas.close}
          defaultValues={{
            ...row,
            client_id: clientId,
            type: accountType,
            taxonomy: { label: taxonomy?.name, value: taxonomy?.id }
          }}
          filters={props.filters}
        />
      ),
      submit: true,
      title: `Edit ${accountType}`
    })
    console.log(row)
  }

  return (
    <Details2
      open
      title={props.title}
      toolbar={
        <UserAccountToolbar type={accountType} clientId={clientId} filters={props.filters} />
      }
    >
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
