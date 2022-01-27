/**
 * Components - Module - Forms - Create - Types
 */

import { STATUS_ACTIVE } from '../general'

// Types

// TODO: resolve optional props issue with yupResolver
interface ModuleFormType {
  id: number | undefined
  courseId: number
  title: string
  description: string | undefined
  ordering: number | undefined
  status: STATUS_ACTIVE
}
