/**
 * Components - Users - View - UserDetails
 */

// React
import { MouseEvent, useContext } from 'react'

// UI
import {
  Button,
  ButtonToolbar,
  Details,
  DetailsText,
  formatDateStandard,
  OffCanvasContext
} from '@drykiss/industry-ui'

// Hooks
import { UpsertUserForm } from '../forms'

// Constants
import { LOCALE_NS } from '@availabletowork/constants'

// Types
import { offCanvasType, User } from '@availabletowork/types'

// I18n
import useTranslation from '../../../translations/hooks/useTranslation'

export const UserDetails = ({ user }: { user: Partial<User> }) => {
  const offCanvas: offCanvasType = useContext(OffCanvasContext)
  const { t } = useTranslation(LOCALE_NS.Profile)

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
    <Details open title="Details" toolbar={<Toolbar />}>
      <DetailsText content="Name" text={`${user.name_first} ${user.name_last}`} />
      <DetailsText content={t('common:Email')} text={user.email} />
      <DetailsText content={t('Phone')} text={user?.phone || '-'} />
      <DetailsText content={t('Locale')} text={user?.meta?.locale || '-'} />
      <DetailsText content={t('Status')} text={user.status} />
      <DetailsText content={t('DateAdded')} text={formatDateStandard(user.created_at)} />
      <DetailsText content={t('DateUpdated')} text={formatDateStandard(user.updated_at)} />
    </Details>
  )
}
