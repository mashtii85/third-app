/**
 * Components - Module - Forms - Create - Types
 */

// Types
import { STATUS_ACTIVE } from '../../../../types/select.d'

interface ModuleFormType {
  id: number | undefined
  courseId: number
  title: string
  description: string | undefined
  ordering: number | undefined
  status: STATUS_ACTIVE
}
