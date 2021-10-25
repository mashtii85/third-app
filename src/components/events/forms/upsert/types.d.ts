/**
 * Components - Event - Forms - Upsert - types.d
 */

import { LooseObject } from '../../../../types/object.d'
import { Options } from '../../../../types/options'
import { Event, EventFilter } from '../../types.d'

export type EventFormType = Omit<Event, 'id', 'taxonomy' | 'custom_fields' | 'location_id'>

export interface EventFormSubmission
  extends Omit<Event, 'account_id' | 'taxonomy_id' | 'taxonomy'> {
  taxonomy?: Options
}

export interface EventFormProps {
  onSuccess: () => void
  filters: EventFilter
  defaultValues?: EventFormSubmission | LooseObject
}
