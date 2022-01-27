/**
 * Components - Groups - Forms - Create - Types
 */

// Types
import { STATUS_ACTIVE } from '../general'

interface GroupFormType {
  id: number | undefined
  accountId: number | undefined
  taxonomyId: number | undefined
  name: string
  description: string | undefined
  status: STATUS_ACTIVE
}
