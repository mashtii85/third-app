/**
 * Components - Users - View - NotificationSettings - NotificationSettings
 */

// React
import { MouseEvent, useContext } from 'react'

// UI
import {
  Button,
  ButtonToolbar,
  capitalize,
  Details2,
  DetailsText,
  OffCanvasContext
} from '@drykiss/industry-ui'
import { offCanvasType } from '../../../../types/offCanvas'

// Types
import { UserMeta } from '../../../../types/user'
import { STATUS_ACTIVE } from '../../../../types/select.d'
import { UpsertNotificationSettingsForm } from './upsert/upsert'

export const NotificationSettings = ({
  userId,
  meta = { notifications: { alert: false, email: false, push: false, sms: false } }
}: {
  meta?: Partial<UserMeta>
  userId: number
}) => {
  const offCanvas: offCanvasType = useContext(OffCanvasContext)
  // const { t } = useTranslation(LOCALE_NS.Profile)

  const { alert, email, push, sms } = meta?.notifications ?? {
    alert: false,
    email: false,
    push: false,
    sms: false
  }

  const handleClick = (e: MouseEvent<HTMLElement>): void => {
    e.stopPropagation()
    offCanvas.show({
      content: (
        <UpsertNotificationSettingsForm
          userId={userId}
          userMeta={meta}
          onSuccess={offCanvas.close}
        />
      ),
      title: 'Edit Notifications'
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

  const active = capitalize(STATUS_ACTIVE.Active)
  const inactive = capitalize(STATUS_ACTIVE.Inactive)

  return (
    <Details2 open title="Notifications" toolbar={<Toolbar />}>
      <DetailsText content="Alert" text={alert ? active : inactive} />

      <DetailsText content={'Email'} text={email ? active : inactive} />

      <DetailsText content={'Push'} text={push ? active : inactive} />

      <DetailsText content={'SMS'} text={sms ? active : inactive} />
    </Details2>
  )
}
