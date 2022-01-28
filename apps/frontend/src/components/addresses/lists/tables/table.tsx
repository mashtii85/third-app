/**
 * Components - Addresses - List - Table - Table
 */

// UI
import { capitalize, Details, DetailsText } from '@drykiss/industry-ui'

// Helpers
import { Toolbar } from './helpers'

// Constants
import { ADDRESS_TYPE } from '@availabletowork/constants'

// Type
import { Address, UseAddressProps } from '@availabletowork/types'

export const AddressTable = ({
  addressType,
  filters,
  selectedAddress,
  onCompleted
}: {
  addressType: ADDRESS_TYPE
  filters: Partial<UseAddressProps>
  selectedAddress?: Address
  onCompleted: () => void
}) => {
  return (
    <Details
      open
      key={`${filters.entity}-${filters.entityId}`}
      title={`${capitalize(addressType)} address`}
      toolbar={<Toolbar addressType={addressType} filters={filters} onCompleted={onCompleted} />}
    >
      {selectedAddress ? (
        <>
          <DetailsText content="Name" text={selectedAddress?.name} />
          <DetailsText content="Line" text={selectedAddress?.line1} />
          <DetailsText content="City" text={selectedAddress?.city} />
          <DetailsText content="Postcode" text={selectedAddress?.postcode} />
        </>
      ) : (
        <>
          <DetailsText text="No selected address" />
        </>
      )}
    </Details>
  )
}
