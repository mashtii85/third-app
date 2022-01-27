/**
 * Components - Groups - List - Table
 */

// React
import { MouseEvent, useContext } from 'react'

// UI
import { Details, Table, OffCanvasContext } from '@drykiss/industry-ui'

// Helpers
import { Toolbar, columns, rows } from './helpers'

// Hooks
import { useGroups } from '../../hooks/useGroups/useGroups'

// Forms
import { GroupForm } from '../../forms/upsert/form'
import { GroupDeleteForm } from '../../forms/delete/delete'

// Types
import {
  GroupDeleteType,
  GroupFilter,
  GroupFormType,
  GroupTableRowsType,
  offCanvasType
} from '@availabletowork/types'

export const GroupTable = (filters: Partial<GroupFilter>) => {
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)
  const { groups, loading } = useGroups(filters)

  const handleDelete = (_: MouseEvent<HTMLElement>, row: GroupTableRowsType) => {
    const groupDeleteProps: GroupDeleteType = {
      id: row.id,
      accountId: row.accountId,
      taxonomyId: row.taxonomyId,
      name: row.name
    }
    offCanvas.show({
      content: <GroupDeleteForm groupDeleteProps={groupDeleteProps} onSuccess={offCanvas.close} />,
      title: 'Delete group',
      submit: false
    })
  }

  const handleEdit = (_: MouseEvent<HTMLElement>, row: GroupTableRowsType) => {
    const defaultValues: GroupFormType = {
      id: row.id,
      accountId: row.accountId,
      taxonomyId: row.taxonomyId,
      name: row.name,
      description: row.description ?? '',
      status: row.status
    }
    offCanvas.show({
      content: <GroupForm onSuccess={offCanvas.close} defaultValues={defaultValues} />,
      title: `${defaultValues.id ? 'Edit' : 'Add'} a group`
    })
  }

  return (
    <Details open title="Groups" size="sm" toolbar={<Toolbar accountId={filters.accountId} />}>
      <Table
        loading={loading}
        columns={columns({ handleDelete, handleEdit })}
        rows={rows(groups)}
      />
    </Details>
  )
}
