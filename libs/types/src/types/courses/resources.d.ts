/**
 * Components - Courses - Resources - Forms - Upsert - Types
 */

// Constants
import { ENTITIES, POST_TYPE, STATUS_ACTIVE } from '@availabletowork/constants'

// Types
import { PostCustomFields } from '../general'
import { DropzoneType, Medium } from '../media'

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
