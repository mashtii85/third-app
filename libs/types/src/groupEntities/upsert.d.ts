/**
 * Components - GroupEntities - Forms - Upsert - Types.d
 */

// Constants
import { STATUS_ACTIVE } from '@availabletowork/constants'

interface GroupEntityFormType {
  group: { label: string; value: string }
  status: STATUS_ACTIVE
}
