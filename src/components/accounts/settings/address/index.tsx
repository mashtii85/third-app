/**
 * Components - Accounts - Settings - Client - Address
 */

// UI
import { Column, Row } from '@drykiss/industry-ui'

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
      <Column md={6}>{user.account_id && <AddressTable filters={filters} />}</Column>
    </Row>
  )
}
