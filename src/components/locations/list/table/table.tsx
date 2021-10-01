/**
 * Components - Locations - List - Table - Table
 */

// React
import { MouseEvent, useContext } from 'react'

// UI
import { Details2, OffCanvasContext, Table } from '@drykiss/industry-ui'
import { useTable } from '../../../common/hooks/useTable'

// Helpers
import { columns, rows, Toolbar } from './helpers'

// Hooks
import { useLocations } from '../../hooks'
// Types
import { LocationFilter } from '../../types.d'
import { LocationTableRowsType, LocationTableProps } from './types'

import { UpsertLocation, DeleteLocation } from '../../forms'
import { offCanvasType } from '../../../../types/offCanvas'

const initialSort = {}

export const LocationTable = ({ accountId, filters }: LocationTableProps) => {
  const { initialData, ref } = useTable<LocationFilter>({ filters, initialSort })

  const { locationList, loading } = useLocations({
    accountId,
    filters: initialData
  })

  const offCanvas = useContext<offCanvasType>(OffCanvasContext)
  const handleDelete = (e: MouseEvent<HTMLElement>, row: LocationTableRowsType) => {
    console.log(e, row)

    offCanvas.show({
      content: (
        <DeleteLocation
          accountId={accountId}
          locationId={row.id!}
          name={row.name}
          onSuccess={offCanvas.close}
          filters={initialData}
        />
      ),
      submit: false,
      title: 'Delete Location'
    })
  }

  const handleEdit = (e: MouseEvent<HTMLElement>, row: LocationTableRowsType) => {
    console.log(e, row)
    offCanvas.show({
      content: (
        <UpsertLocation
          onSuccess={offCanvas.close}
          filters={filters}
          defaultValues={{
            id: row.id,
            name: row.name,
            status: row.status,
            taxonomy: { value: row?.taxonomy?.id, label: row?.taxonomy?.name },
            custom_fields: row.custom_fields
          }}
        />
      ),
      submit: true,
      title: 'Edit Location'
    })
  }

  return (
    <Details2 open title="Locations" toolbar={<Toolbar filters={initialData} />}>
      <Table
        loading={loading}
        columns={columns({ handleDelete, handleEdit })}
        rows={rows(locationList)}
        ref={ref}
      />
    </Details2>
  )
}
