/**
 * Components - GroupEntities - Table - Helper
 */

// React
import { MouseEvent } from 'react'

// UI
import { TableActions } from '@drykiss/industry-ui'

// Types
import { GroupEntityRow } from './types'
import { Column } from '../../../types/column'

// Forms
import { GroupEntity } from '../../../types/groupEntity'

export const columns = ({
  handleDelete
}: {
  handleDelete: (_: MouseEvent<HTMLElement>, row: GroupEntityRow) => void
}) => {
  const columnsSchema: Column<GroupEntityRow>[] = [
    { text: 'id', hidden: true },
    { text: 'Group Name' },
    { text: 'Status' },
    {
      text: 'Actions',
      formatter: TableActions,
      formatterData: [
        {
          context: 'danger',
          icon: ['fas', 'trash'],
          onClick: handleDelete,
          tooltip: 'Delete'
        }
      ]
    }
  ]
  return columnsSchema
}

export const rows = (groupEntities: GroupEntity[]): GroupEntityRow[] => {
  const list = groupEntities?.map((entity) => ({
    id: entity.id,
    groupName: entity.group.name,
    status: entity.status,
    actions: ''
  }))
  return list
}
