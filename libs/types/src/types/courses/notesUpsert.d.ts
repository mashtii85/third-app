/**
 * Components - Courses - Notes - Forms - Upsert - Types
 */

// Types
import { ENTITIES } from '../../constants/entities'
import { POST_TYPE } from '../../../../../types/post.d'
import { STATUS_ACTIVE } from '../../../../../types/select.d'

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
