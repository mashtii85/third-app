/**
 * Components - Media - Forms - Create - Types
 */

// Types
import { DropzoneType, MEDIUM_CATEGORY, MEDIUM_TYPE } from '../../../../types/medium.d'
import { SELECT_STATUS } from '../../../../types/select.d'

interface MediaFormType {
  category: MEDIUM_CATEGORY
  entity: string
  entityId: number
  type: MEDIUM_TYPE
  status: SELECT_STATUS
}

interface MediaSubmitFormType {
  dropzone: DropzoneType[]
}
