/**
 * Components - Media - Forms - Create - Types
 */

// Constants
import { ENTITIES } from '../../constants'

// Types
import { STATUS_ACTIVE } from '../general'
import { DropzoneProps, DropzoneType, MediaFilter, MEDIUM_CATEGORY, MEDIUM_TYPE } from '.'

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
