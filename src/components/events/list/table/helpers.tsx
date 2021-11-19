/**
 * Components - Events - List - Table - Helper
 */

// React
import { MouseEvent, useContext } from 'react'

// UI
import { Button, formatDateStandard, OffCanvasContext, TableActions } from '@drykiss/industry-ui'

// Types
import { EventTableRowsType } from './types'

// Types
import { Event, EventFilter } from '../../types'
import { offCanvasType } from '../../../../types/offCanvas'
import { UpsertEvent } from '../../forms'
import { Column } from '../../../../types/column'

export interface EventRows {
  id: number
  name: string
  status: string
  created: string
}

export const columns = ({
  handleDelete,
  handleEdit
}: {
  handleDelete: (e: MouseEvent<HTMLElement>, row: EventTableRowsType) => void
  handleEdit: (e: MouseEvent<HTMLElement>, row: EventTableRowsType) => void
}): Column<EventTableRowsType>[] => {
  return [
    {
      text: 'id',
      hidden: true
    },
    {
      // formatter: TableLink(pages.dashboard.coursesClient.view_by_id, 'id', 'name'),
      text: 'Title'
    },
    { text: 'Type' },
    { text: 'Status' },
    {
      text: 'Custom Fields',
      hidden: true
    },
    {
      text: 'Taxonomy id',
      hidden: true
    },
    {
      text: 'Date',
      formatter: ({ row }) => row.created_at && formatDateStandard(row.created_at)
    },
    {
      text: 'Start',
      formatter: ({ row }) => row.start_at && formatDateStandard(row.start_at)
    },
    {
      text: 'End',
      formatter: ({ row }) => row.end_at && formatDateStandard(row.end_at)
    },
    {
      text: 'Location Id',
      hidden: true
    },
    {
      text: 'description',
      hidden: true
    },
    {
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
      ],
      text: 'Actions'
    }
  ]
}

export const rows = (events: Event[]): EventTableRowsType[] => {
  const list = events.map((item) => {
    return {
      id: item.id,
      title: item.title,
      type: item.taxonomy?.name,
      status: item.status,
      taxonomy: item.taxonomy,
      custom_fields: item.custom_fields,
      start_at: item.start_at ? new Date(item.start_at) : undefined,
      end_at: item.end_at ? new Date(item.end_at) : undefined,
      created_at: item.created_at,
      location_id: item.location_id,
      description: item.description,
      actions: ''
    }
  })

  return list
}

export const Toolbar = ({ filters }: { filters: EventFilter }) => {
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)

  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    offCanvas.show({
      content: <UpsertEvent onSuccess={offCanvas.close} filters={filters} />,
      submit: true,
      title: 'Add an event'
    })
  }

  return <Button context="white" onClick={handleClick} size="sm" content="Create an event" />
}
