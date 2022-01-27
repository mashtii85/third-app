/**
 * Components - Users - View - UserProfile
 */

// UI
import { Column, Row, Space } from '@drykiss/industry-ui'
import { ProfileHeader } from '../../profileHeader/profileHeader'
import { UserAccountsTable } from '../accounts/table'
import { UserDetails } from './details'
import { NotificationSettings } from './notificationSettings/notificationSettings'

// Types
import { UserDetailsProps } from '@availabletowork/types'

// Hooks
import { useUser } from '../hooks'

const UserProfile = ({ userId }: UserDetailsProps) => {
  const { loading, user } = useUser(userId)

  if (!user) {
    return <></>
  }

  return (
    <Row>
      <Column md={6}>
        <ProfileHeader entity={{ name: `${user.name_first} ${user.name_last}` }} />
        <UserDetails user={user} />
      </Column>
      <Column md={6}>
        <UserAccountsTable loading={loading} user={user} />
        <Space />
        <NotificationSettings meta={user?.meta} userId={user.id} />
      </Column>
    </Row>
  )
}

export default UserProfile
