/**
 * Components - Media - Forms - Create - Types
 */

// Constants
import { ENTITIES } from '../../../../constants/entities'

// Types
import {
  DropzoneProps,
  DropzoneType,
  MEDIUM_CATEGORY,
  MEDIUM_TYPE
} from '../../../../types/medium.d'
import { STATUS_ACTIVE } from '../../../../types/select.d'

interface MediaFormType {
  taxonomyId: number
  category: MEDIUM_CATEGORY
  entity: ENTITIES
  entityId: number
  type: MEDIUM_TYPE
  status: STATUS_ACTIVE
  dropzone?: DropzoneType[]
}

interface MediaSubmitFormType {
  dropzone: DropzoneType[]
}

export interface MediaFormProps {
  filters: Partial<MediaFilter>
  dropzoneProps: DropzoneProps
  defaultValues: Partial<MediaFormType>
  onSuccess: (data: any) => void
}
