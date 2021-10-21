/**
 * Components - Media - Forms - Create - Types
 */

// Constants
import { ENTITIES } from '../../../../constants/entities'

// Types
import { DropzoneType, MEDIUM_CATEGORY, MEDIUM_TYPE } from '../../../../types/medium.d'
import { STATUS_ACTIVE } from '../../../../types/select.d'

interface MediaFormType {
  category: MEDIUM_CATEGORY
  entity: ENTITIES
  entityId: number
  type: MEDIUM_TYPE
  status: STATUS_ACTIVE
}

interface MediaSubmitFormType {
  dropzone: DropzoneType[]
}
