/**
 * Components - Users - View - Details
 */

// React
import { MouseEvent, useContext } from 'react'

// UI
import {
  Button,
  ButtonToolbar,
  Column,
  Details2,
  DetailsText,
  formatDateStandard,
  OffCanvasContext,
  Row
} from '@drykiss/industry-ui'
import { ProfileHeader } from '../profileHeader/profileHeader'
import { UpsertUserForm } from './forms'
import { UserAccountsTable } from './accounts/table'
import { offCanvasType } from '../../types/offCanvas'

// Types
import { UserDetailsProps } from './types.d'
import { useUser } from './hooks'

// I18n
import useTranslation from '../../translations/hooks/useTranslation'
import { LOCALE_NS } from '../../types/locales.d'

const UserDetails = ({ userId }: UserDetailsProps) => {
  const offCanvas: offCanvasType = useContext(OffCanvasContext)

  const { loading, user } = useUser(userId)

  const { t } = useTranslation(LOCALE_NS.Profile)

  if (!user) {
    return <></>
  }

  const handleClick = (e: MouseEvent<HTMLElement>): void => {
    e.stopPropagation()
    offCanvas.show({
      content: <UpsertUserForm defaultValues={user} onSuccess={offCanvas.close} />,
      title: 'Edit User'
    })
  }

  const Toolbar = () => {
    return (
      <ButtonToolbar>
        <Button context="secondary" onClick={handleClick}>
          Edit
        </Button>
      </ButtonToolbar>
    )
  }

  return (
    <Row>
      <Column md={6}>
        <ProfileHeader entity={{ name: `${user.name_first} ${user.name_last}` }} />
        <Details2 open title="Details" toolbar={<Toolbar />}>
          <DetailsText content="Name" text={`${user.name_first} ${user.name_last}`} />
          <DetailsText content={t('common:Email')} text={user.email} />
          <DetailsText content={t('Phone')} text={user?.phone || '-'} />
          <DetailsText content={t('Locale')} text={user?.meta?.locale || '-'} />
          <DetailsText content={t('Status')} text={user.status} />
          <DetailsText content={t('DateAdded')} text={formatDateStandard(user.created_at)} />
          <DetailsText content={t('DateUpdated')} text={formatDateStandard(user.updated_at)} />
        </Details2>
      </Column>
      <Column md={6}>
        <UserAccountsTable loading={loading} user={user} />
      </Column>
    </Row>
  )
}

export default UserDetails
