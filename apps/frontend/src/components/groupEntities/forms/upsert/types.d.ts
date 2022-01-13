/**
 * Components - GroupEntities - Forms - Upsert - Types.d
 */

// Types
import { STATUS_ACTIVE } from '../../../../types/select.d'

interface GroupEntityFormType {
  group: { label: string; value: string }
  status: STATUS_ACTIVE
}
