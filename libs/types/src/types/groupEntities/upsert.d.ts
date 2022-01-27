/**
 * Components - GroupEntities - Forms - Upsert - Types.d
 */

// Types
import { STATUS_ACTIVE } from '../general'

interface GroupEntityFormType {
  group: { label: string; value: string }
  status: STATUS_ACTIVE
}
