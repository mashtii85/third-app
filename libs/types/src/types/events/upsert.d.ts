/**
 * Components - Event - Forms - Upsert - types.d
 */

//Types
import { Options } from '..'
import { Event, EventFilter } from './events'

export interface EventFormType
  extends Omit<Event | 'id', 'taxonomy' | 'custom_fields' | 'location_id'> {
  taxonomy: Options
}

export interface EventFormSubmission
  extends Omit<Event, 'account_id' | 'taxonomy_id' | 'taxonomy'> {
  taxonomy?: Options
}

export interface EventFormProps {
  onSuccess: () => void
  filters: EventFilter
  defaultValues?: EventFormSubmission
}
