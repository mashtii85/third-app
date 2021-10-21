/**
 * Components - Courses - Resources - Hooks - useCreate - Types
 */

// Constants
import { ENTITIES } from '../../../../../constants/entities'

// Types.d
import { POST_TYPE, PostCustomFields } from '../../../../../types/post.d'
import { STATUS_ACTIVE } from '../../../../../types/select.d'
import { UseHookOutput } from '../../../../../types/hook.d'
import { Medium, MEDIUM_CATEGORY, MEDIUM_TYPE } from '../../../../../types/medium.d'

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
