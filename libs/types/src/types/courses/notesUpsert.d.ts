/**
 * Components - Courses - Notes - Forms - Upsert - Types
 */

// Types
import { ENTITIES } from '../../constants'
import { POST_TYPE, STATUS_ACTIVE } from '../general'
export interface NotesFormType {
  id: number | undefined
  entity: ENTITIES
  entityId: number
  accountId: number
  title: string
  type: POST_TYPE
  content: string | undefined
  status: STATUS_ACTIVE
}
