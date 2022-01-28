/**
 * Components - Courses - Resources - Hooks - useCreate - Types
 */

// Constants
import { ENTITIES, MEDIUM_CATEGORY, POST_TYPE, STATUS_ACTIVE } from '@availabletowork/constants'

// Types
import { UseHookOutput } from '../general'
import { Medium, MEDIUM_TYPE } from '../media'
import { PostCustomFields } from '../posts'

export interface ResourceCreateType {
  caption: string
  category: MEDIUM_CATEGORY
  type: MEDIUM_TYPE
  client_id: number
  entity: ENTITIES
  extension: string
  filename: string
  status: STATUS_ACTIVE
  post: {
    data: {
      account_id: number
      content?: string
      entity: ENTITIES
      entity_id: number
      status: STATUS_ACTIVE
      title: string
      type: POST_TYPE
      custom_fields: PostCustomFields
    }
  }
}

export interface ResourceCreateData {
  post: { returning: Medium[] }
}

export interface UseCreateResourceOutput extends UseHookOutput {
  createResource: any
}
