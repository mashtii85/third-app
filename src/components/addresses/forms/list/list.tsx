/**
 * Components - Addresses - List - Table - Table
 */

// React
import { MouseEvent, useContext } from 'react'

// UI
import { Table, OffCanvasContext } from '@drykiss/industry-ui'
import { AddButton } from '../../../common/buttons/addButton'

// Helpers
import { columns, rows } from './helpers'

// Hooks
import { useAddresses } from '../../hooks/useAddresses'

// Type
import { UseAddressProps } from '../../hooks/types.d'
import { AddressTableRowsType } from './types.d'
import { AddressFormType } from '../../forms/create/types.d'
import { ADDRESS_STATUS } from '../../../../types/address.d'
import { offCanvasType } from '../../../../types/offCanvas.d'

// Forms
import { AddressForm } from '../../forms/create/form'
import { DeleteAddressForm } from '../../forms/delete/delete'

export const AddressListForm = ({ filters }: { filters: UseAddressProps }) => {
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)
  const { addressList, loading } = useAddresses(filters)

  const handleDelete = (_: MouseEvent<HTMLElement>, row: AddressTableRowsType): void => {
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

  const handleEdit = (_: MouseEvent<HTMLElement>, row: AddressTableRowsType): void => {
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

  const handleClick = (e: MouseEvent): void => {
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

  return (
    <>
      <Table
        fullHeight
        align
        loading={loading}
        columns={columns({ handleDelete, handleEdit })}
        rows={rows(addressList)}
      />
      <AddButton content="Add New" disabled={loading} handleClick={handleClick}>
        <></>
      </AddButton>
    </>
  )
}
