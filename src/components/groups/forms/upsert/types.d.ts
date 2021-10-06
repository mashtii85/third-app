/**
 * Components - Groups - Forms - Create - Types
 */

// Types
import { SELECT_STATUS } from '../../../../types/select.d'

interface GroupFormType {
  id: number | undefined
  accountId: number | undefined
  taxonomyId: number | undefined
  name: string
  description: string | undefined
  status: SELECT_STATUS
}
