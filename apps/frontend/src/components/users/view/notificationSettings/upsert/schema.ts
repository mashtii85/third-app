/**
 * Components - Users View - Upsert - Schema
 */

// Yup
import { bool, object, SchemaOf } from 'yup'
import { NotificationSettingsType } from '../../../../../types/user'

export const NotificationSettingsSchema: SchemaOf<Partial<NotificationSettingsType>> =
  object().shape({
    alert: bool().optional(),
    email: bool(),
    sms: bool(),
    push: bool()
  })
