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

// Forms
import { AddressForm } from '../../forms/create/form'
import { DeleteAddressForm } from '../../forms/delete/delete'
import { useDefaultAddress } from '../../hooks/useDefaultAddress/useDefaultAddress'

// Type
import { UseAddressProps } from '../../hooks/types.d'
import { AddressTableRowsType } from './types.d'
import { AddressFormType } from '../../forms/create/types.d'
import { ADDRESS_TYPE } from '../../../../types/address.d'
import { offCanvasType } from '../../../../types/offCanvas.d'
import { DefaultAddressHookProps } from '../../hooks/useDefaultAddress/types.d'
import { STATUS_ACTIVE } from '../../../../types/select.d'

export const AddressListForm = ({
  addressType,
  filters,
  onCompleted
}: {
  addressType: ADDRESS_TYPE
  filters: Partial<UseAddressProps>
  onCompleted: () => void
}) => {
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)
  const { addressList, loading } = useAddresses(filters)

  const handleCompleted = () => {
    offCanvas.close()
    onCompleted()
  }

  const { defaultAddress } = useDefaultAddress({
    onCompleted: handleCompleted,
    onError: (error) => {
      console.error(error)
    }
  })

  const handleDelete = (_: MouseEvent<HTMLElement>, row: AddressTableRowsType): void => {
    offCanvas.show({
      content: (
        <DeleteAddressForm
          id={row.id!}
          entity={filters.entity!}
          entityId={filters.entityId!}
          type={filters.type}
          title={row.name}
          onSuccess={handleCompleted}
        />
      ),
      submit: false,
      title: 'Delete Address'
    })
  }

  const handleEdit = (_: MouseEvent<HTMLElement>, row: AddressTableRowsType): void => {
    const defaultValues: Partial<AddressFormType> = {
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
      type: filters.type,
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

  const handleChecked = async (_: MouseEvent<HTMLElement>, row: AddressTableRowsType) => {
    const value = JSON.parse(`{"${addressType}": true}`)

    const variables: DefaultAddressHookProps = {
      id: row.id!,
      entity: row.entity,
      entityId: row.entityId,
      deleteKey: addressType.toString(),
      value
    }

    await defaultAddress({ variables })
  }

  const handleClick = (e: MouseEvent): void => {
    e.stopPropagation()
    offCanvas.show({
      content: (
        <AddressForm
          filters={filters}
          onSuccess={handleCompleted}
          defaultValues={{
            type: addressType,
            status: STATUS_ACTIVE.Active
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
        columns={columns({ type: addressType, handleDelete, handleEdit, handleChecked })}
        rows={rows(addressList)}
      />
      <AddButton content="Add New" disabled={loading} handleClick={handleClick} />
    </>
  )
}
