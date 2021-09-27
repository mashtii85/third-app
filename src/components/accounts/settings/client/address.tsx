/**
 * Components - Accounts - Settings - Client - Address
 */

// UI
import { Details2, Space, Row, Column } from '@drykiss/industry-ui'

// Types
import { AddressTable } from '../../../addresses/lists/tables/table'

// Helpers
import { Toolbar } from '../../../addresses/lists/tables/helpers'

// Hooks
import { useCurrentUser } from '../../../../utils/useCurrentUser'

export const ClientAddress = () => {
  const { user } = useCurrentUser()

  return (
    <Row>
      <Column md="5">
        {user.account_id && (
          <>
            <Space />
            <Details2
              open
              key={user.account_id}
              title="Addresses"
              toolbar={<Toolbar entity="account" entityId={user.account_id} type="invoice" />}
            >
              <AddressTable entity="account" entityId={user.account_id} type="invoice" />
            </Details2>
          </>
        )}
      </Column>
      <Column md="7"></Column>
    </Row>
  )
}
