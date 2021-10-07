/**
 * Components - Events - Forms - Upsert - Schema
 */

// Yup
import { date, mixed, object, string, SchemaOf } from 'yup'

// Types
import { STATUS_ACTIVE } from '../../../../types/select.d'
import { EventFormType } from './types'

export const EventSchema: SchemaOf<EventFormType> = object().shape({
  title: string().required(),
  start_at: date().nullable(),
  end_at: date().nullable(),
  description: string(),
  created_at: string(),
  status: mixed().oneOf(Object.values(STATUS_ACTIVE))
})
