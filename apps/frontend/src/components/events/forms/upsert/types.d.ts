/**
 * Components - Event - Forms - Upsert - types.d
 */

import { Options } from '../../../../types/options'
import { Event, EventFilter } from '../../types.d'

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
