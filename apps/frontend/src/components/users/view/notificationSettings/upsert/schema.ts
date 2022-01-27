/**
 * Components - Users View - Upsert - Schema
 */

// Yup
import { bool, object, SchemaOf } from 'yup'

// Types
import { NotificationSettingsType } from '@availabletowork/types'

export const NotificationSettingsSchema: SchemaOf<Partial<NotificationSettingsType>> =
  object().shape({
    alert: bool().optional(),
    email: bool(),
    sms: bool(),
    push: bool()
  })
