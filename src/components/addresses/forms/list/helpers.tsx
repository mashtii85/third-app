/**
 * Components - Addresses - List - Table - Helper
 */

// React
import { MouseEvent, useContext } from 'react'

// UI
import {
  formatTime,
  formatDateStandard,
  Button,
  OffCanvasContext,
  TableActions
} from '@drykiss/industry-ui'

// Forms
import { AddressForm } from '../../forms/create/form'

// Constants
import { THEME_CONTEXT } from '../../../../constants/themeContext'
import { UseAddressProps } from '../../hooks/types'

// Types
import { Address, ADDRESS_STATUS, ADDRESS_TYPE } from '../../../../types/address.d'
import { AddressTableRowsType, AddressToolbarType } from './types.d'
import { Column } from '../../../../types/column.d'
import { offCanvasType } from '../../../../types/offCanvas.d'

export const columns = ({
  type,
  handleDelete,
  handleEdit,
  handleChecked
}: {
  type: ADDRESS_TYPE
  handleDelete: (e: MouseEvent<HTMLElement>, row: AddressTableRowsType) => void
  handleEdit: (e: MouseEvent<HTMLElement>, row: AddressTableRowsType) => void
  handleChecked: (e: MouseEvent<HTMLElement>, row: AddressTableRowsType) => void
}) => {
  const disabled = (row: AddressTableRowsType) =>
    row && row.meta ? row?.meta[type] === true : false

  const actionFormatter = ({ row }: { row: AddressTableRowsType }) =>
    TableActions({
      row: row,
      data: [
        {
          context: THEME_CONTEXT.dark,
          icon: ['fas', 'check'],
          onClick: handleChecked,
          tooltip: 'Select',
          disabled: disabled(row)
        },
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
      ]
    })

  const columnsSchema: Column<AddressTableRowsType>[] = [
    { text: 'Id', hidden: true },
    { text: 'Name' },
    { text: 'entity', hidden: true },
    { text: 'entityId', hidden: true },
    { text: 'Line1', hidden: true },
    { text: 'Line2', hidden: true },
    { text: 'Line3', hidden: true },
    { text: 'City' },
    { text: 'Postcode' },
    { text: 'County', hidden: true },
    { text: 'Meta', hidden: true },
    { text: 'Status', hidden: true },
    { text: 'Date' },
    {
      text: 'Actions',
      formatter: actionFormatter
    }
  ]
  return columnsSchema
}

export const rows = (addresses: Address[]): AddressTableRowsType[] => {
  const list: AddressTableRowsType[] = addresses?.map((address) => {
    return {
      id: address.id,
      name: address.name,
      entity: address.entity,
      entityId: address.entity_id,
      line1: address.line1,
      line2: address.line2,
      line3: address.line3,
      city: address.city,
      postcode: address.postcode,
      county: address.county,
      meta: address.meta,
      status: address.status,
      date: `${formatDateStandard(address.created_at)} ${formatTime(address.created_at)}`,
      actions: ''
    }
  })
  return list
}

export const Toolbar = ({ entity, entityId, type }: AddressToolbarType) => {
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)
  const filters: Partial<UseAddressProps> = { entity, entityId, type }

  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    offCanvas.show({
      content: (
        <AddressForm
          filters={filters}
          onSuccess={offCanvas.close}
          defaultValues={{
            status: ADDRESS_STATUS.Active
          }}
        />
      ),
      submit: true,
      title: 'Add an address'
    })
  }

  return <Button context="white" onClick={handleClick} size="sm" content="Create an address" />
}
