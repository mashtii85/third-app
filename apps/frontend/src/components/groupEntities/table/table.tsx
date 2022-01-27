/**
 * Components - GroupEntities - Table - Table
 */

// React
import { MouseEvent, useContext } from 'react'

// UI
import { Button, OffCanvasContext, Space, Table } from '@drykiss/industry-ui'

// Helpers
import { columns, rows } from './helpers'

// Hooks
import { useGroupEntities } from '../hooks'

// Forms
import { GroupEntityDeleteForm, UpsertGroupEntity } from '../forms'

// Types
import {
  GroupEntityDeleteType,
  GroupEntityFilter,
  GroupEntityRow,
  offCanvasType
} from '@availabletowork/types'

import { useTable } from '../../common/hooks/useTable'

const initialSort = {}

export const GroupEntitiesTable = (filters: Partial<GroupEntityFilter>) => {
  const { initialData, ref } = useTable<Partial<GroupEntityFilter>>({ filters, initialSort })
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)

  const { groupEntities, loading } = useGroupEntities(filters)

  const handleDelete = (_: MouseEvent<HTMLElement>, row: GroupEntityRow) => {
    const groupDeleteProps: GroupEntityDeleteType = {
      id: row.id,
      filters: initialData,
      groupName: row.groupName,
      onSuccess: offCanvas.close
    }

    offCanvas.show({
      content: <GroupEntityDeleteForm {...groupDeleteProps} />,
      title: 'Remove from group',
      submit: false
    })
  }
  const handleAddGroup = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    offCanvas.show({
      content: <UpsertGroupEntity onSuccess={offCanvas.close} filters={filters} />,
      submit: true,
      title: 'Add to group'
    })
  }

  return (
    <>
      <Table
        loading={loading}
        columns={columns({ handleDelete })}
        rows={rows(groupEntities)}
        ref={ref}
      />
      <Space />
      <Button context="secondary" onClick={handleAddGroup} size="sm" content="Add to group" />
    </>
  )
}
