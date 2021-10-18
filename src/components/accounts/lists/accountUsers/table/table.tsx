/**
 * Components - Accounts - Lists - UserAccounts - Table
 */

// UI
import { Details2, Table } from '@drykiss/industry-ui'
import { useUsers } from '../../../hooks/useUsers/useUsers'

// Types
import { UserTableProps } from '../../accounts/table/types'
import { columns, rows } from './helpers'
import { useTable } from '../../../../common/hooks/useTable'
import { UsersFilter } from '../../../types'

const initialSort = {}

export const AccountUsersTable = ({ filters }: UserTableProps) => {
  const { initialData, ref } = useTable<UsersFilter>({ filters, initialSort })

  const { users, loading } = useUsers({
    filters: initialData
  })

  return (
    <Details2 open title="Users">
      <Table fullHeight align columns={columns} loading={loading} rows={rows(users)} ref={ref} />
    </Details2>
  )
}
