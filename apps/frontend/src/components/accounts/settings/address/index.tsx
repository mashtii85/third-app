/**
 * Components - Accounts - Settings - Client - Address
 */

// UI
import { Column, Row, Space } from '@drykiss/industry-ui'
import { AddressTable } from '../../../addresses/lists/tables/table'

// Constants
import { ADDRESS_TYPE, ENTITIES, STATUS_ACTIVE } from '@availabletowork/constants'

// Hooks
import { useCurrentUser } from '../../../../utils/useCurrentUser'
import { useAddresses } from '../../../addresses/hooks/useAddresses'

// Types
import { AddressFilter, UseAddressProps } from '@availabletowork/types'

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
