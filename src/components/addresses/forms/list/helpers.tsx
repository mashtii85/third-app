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

// Types
import { Address, ADDRESS_STATUS } from '../../../../types/address.d'
import { AddressTableRowsType, AddressToolbarType } from './types'
import { Column } from '../../../../types/column'
import { offCanvasType } from '../../../../types/offCanvas'

// Forms
import { AddressForm } from '../../forms/create/form'

export const columns = ({
  handleDelete,
  handleEdit
}: {
  handleDelete: (e: MouseEvent<HTMLElement>, row: AddressTableRowsType) => void
  handleEdit: (e: MouseEvent<HTMLElement>, row: AddressTableRowsType) => void
}) => {
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
    { text: 'Status', hidden: true },
    { text: 'Date' },
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

export const rows = (addresses: Address[]): AddressTableRowsType[] => {
  const list = addresses?.map((address) => {
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
      status: address.status,
      date: `${formatDateStandard(address.created_at)} ${formatTime(address.created_at)}`,
      actions: ''
    }
  })
  return list
}

export const Toolbar = ({ entity, entityId, type }: AddressToolbarType) => {
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)
  const filters = { entity, entityId, type }

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
