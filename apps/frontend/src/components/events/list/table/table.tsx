/**
 * Components - Events - List - Table - Table
 */

// React
import { MouseEvent, useContext } from 'react'

// UI
import { Details, OffCanvasContext, Table } from '@drykiss/industry-ui'
import { useTable } from '../../../common/hooks/useTable'

// Helpers
import { columns, rows, Toolbar } from './helpers'

// Hooks
import { useEvents } from '../../hooks'
// Types
import {
  EventFilter,
  EventFormSubmission,
  EventTableRowsType,
  EventTableProps,
  offCanvasType,
  Options
} from '@availabletowork/types'

import { UpsertEvent, DeleteEvent } from '../../forms'

const initialSort = {}

export const EventTable = ({ filters }: EventTableProps) => {
  const { initialData, ref } = useTable<EventFilter>({ filters, initialSort })

  const { eventList, loading } = useEvents({
    filters: initialData
  })

  const offCanvas = useContext<offCanvasType>(OffCanvasContext)
  const handleDelete = (e: MouseEvent<HTMLElement>, row: EventTableRowsType) => {
    console.log(e, row)

    offCanvas.show({
      content: (
        <DeleteEvent
          eventId={row.id}
          title={row.title}
          onSuccess={offCanvas.close}
          filters={initialData}
        />
      ),
      submit: false,
      title: 'Delete Event'
    })
  }

  const handleEdit = (e: MouseEvent<HTMLElement>, { actions, ...row }: EventTableRowsType) => {
    console.log(e, actions)
    // todo: take a look
    let taxonomy: Options | undefined
    if (row?.taxonomy) {
      taxonomy = {
        value: row?.taxonomy?.id?.toString() ?? '-1',
        label: row?.taxonomy?.name ?? ''
      }
    }

    const defaultValues: EventFormSubmission = { ...row, taxonomy }

    offCanvas.show({
      content: (
        <UpsertEvent onSuccess={offCanvas.close} filters={filters} defaultValues={defaultValues} />
      ),
      submit: true,
      title: 'Edit Event'
    })
  }

  const isdate = (date: string): boolean => {
    try {
      Date.parse(date)
      return true
    } catch {
      return false
    }
  }

  const sanitizedEvents = eventList.map((event) => {
    const newEvent = { ...event }
    newEvent.custom_fields = { ...event.custom_fields }
    if (event?.custom_fields) {
      Object.keys(event?.custom_fields).forEach((key) => {
        const val = event?.custom_fields[key]
        if (isdate(val)) newEvent.custom_fields[key] = new Date(val)
      })
    }
    return newEvent
  })

  console.log('sanitizedEvents', sanitizedEvents)
  return (
    <Details open title="Events" toolbar={<Toolbar filters={initialData} />}>
      <Table
        loading={loading}
        columns={columns({ handleDelete, handleEdit })}
        rows={rows(sanitizedEvents)}
        ref={ref}
      />
    </Details>
  )
}
