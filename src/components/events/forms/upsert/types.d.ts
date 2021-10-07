/**
 * Components - Event - Forms - Upsert - types.d
 */

import { LooseObject } from '../../../../types/object.d'
import { Options } from '../../../../types/taxonomy.d'
import { Event, EventFilter } from '../../types.d'

export interface EventFormType
  extends Omit<Event, 'id', 'taxonomy' | 'custom_fields' | 'location_id'> { }

export interface EventFormSubmission extends Event {
  taxonomy?: Options | undefined
}

export interface EventFormProps {
  onSuccess: () => void
  filters: EventFilter
  defaultValues?: EventFormSubmission | LooseObject
}
