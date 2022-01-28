/**
 * Components - Groups - List - Table - Helper
 */

// React
import { MouseEvent, useContext } from 'react'

// UI
import { Button, ButtonToolbar, OffCanvasContext, TableActions } from '@drykiss/industry-ui'

//Constants
import { STATUS_ACTIVE } from '@availabletowork/constants'

// Types
import {
  Column,
  Group,
  GroupFilter,
  GroupTableRowsType,
  offCanvasType
} from '@availabletowork/types'

// Forms
import { GroupForm } from '../../forms/upsert/form'

export const columns = ({
  handleDelete,
  handleEdit
}: {
  handleDelete: (_: MouseEvent<HTMLElement>, row: GroupTableRowsType) => void
  handleEdit: (_: MouseEvent<HTMLElement>, row: GroupTableRowsType) => void
}) => {
  const columnsSchema: Column<GroupTableRowsType>[] = [
    { text: 'id', hidden: true },
    { text: 'accountId', hidden: true },
    { text: 'taxonomyId', hidden: true },
    { text: 'Name' },
    { text: 'Description', hidden: true },
    { text: 'Status' },
    {
      text: 'Actions',
      formatter: TableActions,
      formatterData: [
        {
          context: 'secondary',
          icon: ['fas', 'edit'],
          onClick: handleEdit,
          tooltip: 'Edit'
        },
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

export const rows = (groups: Group[]) => {
  const list = groups?.map((group) => {
    return {
      id: group.id,
      accountId: group.account_id,
      taxonomyId: group.taxonomy_id,
      name: group.name,
      description: group.description,
      status: group.status,
      actions: ''
    }
  })
  return list
}

export const Toolbar = (filters: Partial<GroupFilter>) => {
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)
  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    offCanvas.show({
      content: (
        <GroupForm
          onSuccess={offCanvas.close}
          defaultValues={{
            id: undefined,
            accountId: filters.accountId,
            taxonomyId: filters.taxonomyId,
            name: '',
            description: undefined,
            status: STATUS_ACTIVE.Active
          }}
        />
      ),
      submit: true,
      title: 'Add a group'
    })
  }

  return (
    <ButtonToolbar>
      <Button context="secondary" onClick={handleClick} size="sm" content="Create a group" />
    </ButtonToolbar>
  )
}
