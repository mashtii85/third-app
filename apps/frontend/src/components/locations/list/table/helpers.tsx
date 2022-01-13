/**
 * Components - Locations - List - Table - Helper
 */

// React
import { MouseEvent, useContext } from 'react'

// UI
import { Button, formatDateStandard, OffCanvasContext, TableActions } from '@drykiss/industry-ui'

// Types
import { LocationTableRowsType } from './types'

// Types
import { Location, LocationFilter } from '../../types'
import { offCanvasType } from '../../../../types/offCanvas'
import { UpsertLocation } from '../../forms'
import { Column } from '../../../../types/column'

// Constants
import { THEME_CONTEXT } from '../../../../constants/themeContext'

import { formatToValidDate } from '../../../../utils/dateFormatter'
import { LocationFormType } from '../../forms/upsert/types'

export interface LocationRows {
  id: number
  name: string
  status: string
  created: string
}

export const columns = ({
  handleDelete,
  handleEdit
}: {
  handleDelete: (e: MouseEvent<HTMLElement>, row: LocationTableRowsType) => void
  handleEdit: (e: MouseEvent<HTMLElement>, row: LocationTableRowsType) => void
}): Column<LocationTableRowsType>[] => {
  return [
    {
      text: 'id',
      hidden: true
    },
    {
      // formatter: TableLink(pages.dashboard.coursesClient.view_by_id, 'id', 'name'),
      text: 'Name'
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
      formatter: ({ row }) => formatDateStandard(row.created_at)
    },
    {
      formatter: TableActions,
      formatterData: [
        {
          context: THEME_CONTEXT.secondary,
          icon: ['fas', 'edit'],
          onClick: handleEdit,
          tooltip: 'Edit'
        },
        {
          context: THEME_CONTEXT.danger,
          icon: ['fas', 'trash'],
          onClick: handleDelete,
          tooltip: 'Delete'
        }
      ],
      text: 'Actions'
    }
  ]
}

export const rows = (locations: Location[]): LocationTableRowsType[] => {
  const list: LocationTableRowsType[] = locations.map((item) => {
    return {
      id: item.id,
      name: item.name,
      type: item.taxonomy?.name,
      status: item.status,
      taxonomy: item.taxonomy,
      custom_fields: item.custom_fields,
      created_at: item.created_at,
      actions: ''
    }
  })

  return list
}

export const Toolbar = ({ filters }: { filters: LocationFilter }) => {
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)

  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    offCanvas.show({
      content: <UpsertLocation onSuccess={offCanvas.close} filters={filters} />,
      submit: true,
      title: 'Add a location'
    })
  }

  return (
    <div data-cy="create-location-button">
      <Button context="white" onClick={handleClick} size="sm" content="Create a location" />
    </div>
  )
}

export const prepareLocationUpsertVariables = (row: LocationTableRowsType): LocationFormType => {
  const taxonomy = row.taxonomy && {
    value: row?.taxonomy?.id,
    label: row?.taxonomy?.name
  }
  const values = {
    id: row.id,
    name: row.name,
    status: row.status,
    taxonomy,
    custom_fields: formatToValidDate(row?.custom_fields)
  }
  return values
}
