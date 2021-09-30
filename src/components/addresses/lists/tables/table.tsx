/**
 * Components - Addresses - List - Table - Table
 */

// React
import { ChangeEvent, useContext } from 'react'

// UI
import { Table, OffCanvasContext } from '@drykiss/industry-ui'

// Helpers
import { columns, rows } from './helpers'

// Hooks
import { useAddresses } from '../../hooks/useAddresses'

// Type
import { UseAddressProps } from '../../hooks/types'
import { AddressTableRowsType } from '../tables/types.d'
import { AddressFormType } from '../../forms/create/types'
import { AddressForm } from '../../forms/create/form'
import { DeleteAddressForm } from '../../forms/delete/delete'

export const AddressTable = (filters: UseAddressProps) => {
  const offCanvas = useContext<any>(OffCanvasContext)
  const { addressList, loading } = useAddresses(filters)

  const handleDelete = (_: ChangeEvent<HTMLInputElement>, row: AddressTableRowsType) => {
    offCanvas.show({
      content: (
        <DeleteAddressForm
          id={row.id!}
          entity={filters.entity}
          entityId={filters.entityId}
          type={filters.type}
          title={row.name}
          onSuccess={offCanvas.close}
        />
      ),
      submit: false,
      title: 'Delete Address'
    })
  }

  const handleEdit = (_: ChangeEvent<HTMLInputElement>, row: AddressTableRowsType) => {
    const defaultValues: AddressFormType = {
      id: row.id,
      entity: row.entity,
      entityId: row.entityId,
      name: row.name,
      line1: row.line1,
      line2: row.line2,
      line3: row.line3,
      city: row.city,
      postcode: row.postcode,
      county: row.county,
      status: row.status
    }
    offCanvas.show({
      content: (
        <AddressForm onSuccess={offCanvas.close} filters={filters} defaultValues={defaultValues} />
      ),
      submit: true,
      title: 'Edit Address'
    })
  }

  return (
    <Table
      loading={loading}
      columns={columns({ handleDelete, handleEdit })}
      rows={rows(addressList)}
    />
  )
}
