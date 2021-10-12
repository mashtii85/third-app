/**
 * Components - Events - List - Table - Table
 */

// React
import { MouseEvent, useContext } from 'react'

// UI
import { Details2, OffCanvasContext, Table } from '@drykiss/industry-ui'
import { useTable } from '../../../common/hooks/useTable'

// Helpers
import { columns, rows, Toolbar } from './helpers'

// Hooks
import { useEvents } from '../../hooks'
// Types
import { EventFilter } from '../../types'
import { EventTableRowsType, EventTableProps } from './types'

import { UpsertEvent, DeleteEvent } from '../../forms'
import { offCanvasType } from '../../../../types/offCanvas'
import { EventFormSubmission } from '../../forms/upsert/types'
import { Options } from '../../../../types/taxonomy'

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
          eventId={row.id!}
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

  return (
    <Details2 open title="Events" toolbar={<Toolbar filters={initialData} />}>
      <Table
        loading={loading}
        columns={columns({ handleDelete, handleEdit })}
        rows={rows(eventList)}
        ref={ref}
      />
    </Details2>
  )
}
