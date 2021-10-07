/**
 * Components - Groups - List - Table
 */

// React
import { MouseEvent, useContext } from 'react'

// UI
import { Details2, Table, OffCanvasContext } from '@drykiss/industry-ui'

// Helpers
import { Toolbar, columns, rows } from './helpers'

// Hooks
import { useGroup } from '../../hooks/useGroup/useGroup'

// Forms
import { GroupForm } from '../../forms/upsert/form'
import { GroupDeleteForm } from '../../forms/delete/delete'

// Types
import { GroupFilter } from '../../hooks/useGroup/types.d'
import { GroupTableRowsType } from './types.d'
import { GroupFormType } from '../../forms/upsert/types.d'
import { GroupDeleteType } from '../../hooks/useDelete/types.d'
import { offCanvasType } from '../../../../types/offCanvas'

export const GroupTable = (filters: Partial<GroupFilter>) => {
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)
  const { groups, loading } = useGroup(filters)

  const handleDelete = (_: MouseEvent<HTMLElement>, row: GroupTableRowsType) => {
    const groupDeleteProps: GroupDeleteType = {
      id: row.id!,
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
      submit: true,
      title: 'Add a group'
    })
  }

  return (
    <Details2 open title="Groups" toolbar={<Toolbar accountId={filters.accountId} />}>
      <Table
        loading={loading}
        columns={columns({ handleDelete, handleEdit })}
        rows={rows(groups)}
      />
    </Details2>
  )
}
