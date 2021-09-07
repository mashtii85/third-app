/**
 * Components - Users - View - Details
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_USER } from './query'

// Next
import { useRouter } from 'next/router'

// UI
import { Column, Details, DetailsText, formatDateStandard, Row } from '@drykiss/industry-ui'
import { ProfileHeader } from '../profileHeader/profileHeader'
import { UserAccountsTable } from '../modules/accountUsers/table'

// // Types
// import type { User } from '../../types/user'

const UserDetails = () => {
  const { query } = useRouter()

  const { data: { user = {} } = {} } = useQuery(GET_USER, {
    variables: {
      userId: parseInt(query?.id as string)
    }
  })

  if (!query?.id) {
    return <></>
  }

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
      <Column md={6}>
        <UserAccountsTable user={user} />
      </Column>
    </Row>
  )
}

export default UserDetails
