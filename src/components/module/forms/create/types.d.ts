/**
 * Components - Module - Forms - Create - Types
 */

// Types
import { SELECT_STATUS } from '../../../../types/select.d'

interface ModuleFormType {
  id: number | undefined
  courseId: number
  title: string
  description: string | undefined
  ordering: number | undefined
  status: SELECT_STATUS
}
