/**
 * Components - Events - Forms - Upsert - Schema
 */

// Yup
import { date, mixed, object, string, SchemaOf } from 'yup'

// Constants
import { STATUS_ACTIVE } from '@availabletowork/constants'

// Types
import { EventFormSubmission } from '@availabletowork/types'

export const EventSchema: SchemaOf<EventFormSubmission> = object()
  .shape({
    title: string().required(),
    start_at: date().nullable(),
    end_at: date().nullable(),
    description: string(),
    // created_at: string(),
    status: mixed().oneOf(Object.values(STATUS_ACTIVE))
  })
  .required()
