/**
 * Components - Courses - Notes - Forms - Upsert - Types
 */

// Constants
import { ENTITIES, POST_TYPE, STATUS_ACTIVE } from '@availabletowork/constants'
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
