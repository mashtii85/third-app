/**
 * Components - Accounts - Settings - Client - Address
 */

// import { useEffect } from 'react'
// UI
import { Column, Row, Space } from '@drykiss/industry-ui'

// Constants
import { ENTITIES } from '../../../../constants/entities'

// Hooks
import { useCurrentUser } from '../../../../utils/useCurrentUser'
import { useAddresses } from '../../../addresses/hooks/useAddresses'

// Types
import { AddressTable } from '../../../addresses/lists/tables/table'
import { AddressFilter, UseAddressProps } from '../../../addresses/hooks/types.d'
import { ADDRESS_TYPE } from '../../../../types/address.d'
import { STATUS_ACTIVE } from '../../../../types/select.d'

// type values: invoice, registered
export const ClientAddress = () => {
  const { user } = useCurrentUser()

  const filters: Partial<UseAddressProps> = {
    entity: ENTITIES.Account,
    entityId: user.account_id
  }
  const addressFilters: Partial<AddressFilter> = {
    entity: filters.entity,
    entityId: filters.entityId
  }
  const { addressList, refetch } = useAddresses(addressFilters)
  // const selectedAddress = addressList.find((add) => add.status === ADDRESS_STATUS.Active)
  // useEffect(() => {
  //   refetch!()
  // }, [type])
  const registeredDefault = addressList.find(
    (add) =>
      add.meta &&
      add.meta.registered &&
      add.meta.registered === true &&
      add.status === STATUS_ACTIVE.Active
  )
  const invoiceDefault = addressList.find(
    (add) =>
      add.meta &&
      add.meta.invoice &&
      add.meta.invoice === true &&
      add.status === STATUS_ACTIVE.Active
  )

  return (
    <>
      <Row>
        <Column md={6}>
          {user.account_id && (
            <AddressTable
              addressType={ADDRESS_TYPE.Registered}
              filters={filters}
              selectedAddress={registeredDefault}
              onCompleted={refetch}
            />
          )}
        </Column>
      </Row>
      <Space />
      <Row>
        <Column md={6}>
          {user.account_id && (
            <AddressTable
              addressType={ADDRESS_TYPE.Invoice}
              filters={filters}
              selectedAddress={invoiceDefault}
              onCompleted={refetch}
            />
          )}
        </Column>
      </Row>
    </>
  )
}
