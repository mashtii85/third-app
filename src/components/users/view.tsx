/**
 * Components - Users - View - Details
 */

// Next
import { useRouter } from 'next/router'

// UI
import { Column, Details, DetailsText, formatDateStandard, Row } from '@drykiss/industry-ui'
import { ProfileHeader } from '../profileHeader/profileHeader'

// Mocks
import { Users } from '../../mocks/users'

// Types
import type { User } from '../../types/user'

const UserDetails = () => {
  const { query } = useRouter()

  if (!query?.id) {
    return <></>
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user: User = Users.find((c) => c.id === parseInt(query.id as any))!

  if (!user) {
    return <></>
  }

  return (
    <Row>
      <Column md={6}>
        <ProfileHeader entity={{ name: `${user.name_first} ${user.name_last}` }} />

        <Details open summary="Details">
          <DetailsText content="Account Type" text={user.account_type} />
          <DetailsText content="Name" text={`${user.name_first} ${user.name_last}`} />
          <DetailsText content="Email" text={user.email} />
          <DetailsText content="Phone" text={user.phone} />
          <DetailsText content="Status" text={user.status} />
          <DetailsText content="Date Added" text={formatDateStandard(user.created_at)} />
          <DetailsText content="Date Updated" text={formatDateStandard(user.updated_at)} />
        </Details>
      </Column>
      <Column md={6}>Not Implemented</Column>
    </Row>
  )
}

export default UserDetails
