/**
 * Components - Accounts - Settings - Client - Address
 */

// UI
import { Space, Row, Column } from '@drykiss/industry-ui'

// Types
import { AddressTable } from '../../../addresses/lists/tables/table'
import { UseAddressProps } from '../../../addresses/hooks/types.d'

// Constants
import { ENTITIES } from '../../../../constants/entities'

// Hooks
import { useCurrentUser } from '../../../../utils/useCurrentUser'

export const ClientAddress = () => {
  const { user } = useCurrentUser()
  const filters: UseAddressProps = {
    entity: ENTITIES.Account,
    entityId: user.account_id,
    type: 'invoice,registered'
  }

  return (
    <Row>
      <Column md="5">
        {user.account_id && (
          <>
            <Space />
            <AddressTable filters={filters} />
          </>
        )}
      </Column>
      <Column md="7"></Column>
    </Row>
  )
}
