/**
 * Components - Courses - Resources - Forms - Upsert - Types
 */

// Constants
import { ENTITIES } from '@availabletowork/shared'

// Types
import { PostCustomFields, POST_TYPE } from '../../../../../types/post.d'
import { STATUS_ACTIVE } from '../../../../../types/select.d'
import { DropzoneType, Medium } from '../../../../../types/medium.d'

export interface ResourcesFormType {
  id: number | undefined
  entity: ENTITIES
  entityId: number
  accountId: number
  title: string
  type: POST_TYPE
  content: string | undefined
  status: STATUS_ACTIVE
  customFields: PostCustomFields | undefined
  dropzone: DropzoneType[] | undefined
  medium: Medium | undefined
}

export interface RESOURCE_TYPE_DROPDOWN {
  text: 'File' | 'Link'
  value: 'file' | 'link'
}
