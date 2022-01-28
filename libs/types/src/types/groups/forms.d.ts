/**
 * Components - Groups - Forms - Create - Types
 */

// Constants
import { STATUS_ACTIVE } from '@availabletowork/constants'

interface GroupFormType {
  id: number | undefined
  accountId: number | undefined
  taxonomyId: number | undefined
  name: string
  description: string | undefined
  status: STATUS_ACTIVE
}
