/**
 * Components - Addresses - List - Table - Table
 */

// UI
import { Details2, DetailsText } from '@drykiss/industry-ui'

// Helpers
import { Toolbar } from './helpers'

// Hooks
import { useAddresses } from '../../hooks/useAddresses'

// Type
import { UseAddressProps } from '../../hooks/types'
import { Address, ADDRESS_STATUS } from '../../../../types/address.d'

export const AddressTable = ({ filters }: { filters: UseAddressProps }) => {
  const { addressList } = useAddresses(filters)
  const selectedAddress = (): Address | undefined => {
    const address = addressList.find((add) => add.status === ADDRESS_STATUS.Active)
    return address
  }

  return (
    <Details2
      open
      key={`${filters.entity}-${filters.entityId}`}
      title="Selected address"
      toolbar={<Toolbar filters={filters} />}
    >
      {selectedAddress() ? (
        <>
          <DetailsText content="Name" text={selectedAddress()?.name} />
          <DetailsText content="Line" text={selectedAddress()?.line1} />
          <DetailsText content="City" text={selectedAddress()?.city} />
          <DetailsText content="Postcode" text={selectedAddress()?.postcode} />
        </>
      ) : (
        <>
          <DetailsText text="No selected address" />
        </>
      )}
    </Details2>
  )
}
