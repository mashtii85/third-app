/**
 * Components - Courses - Resources - Forms - Upsert - Types
 */

// Types
import { ENTITIES } from '../../constants'
import { PostCustomFields, POST_TYPE, STATUS_ACTIVE } from '../general'
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
