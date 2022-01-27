/**
 * Components - Media - Forms - Create - Schema
 */

// Yup
import { mixed, object, string, SchemaOf, number } from 'yup'

// Types
import { MediaFormType, MEDIUM_CATEGORY, MEDIUM_TYPE } from '@availabletowork/types'

// Constants
import { STATUS_ACTIVE } from '@availabletowork/types'

export const MediaSchema: SchemaOf<MediaFormType> = object()
  .shape({
    id: number(),
    entity: string().required(),
    entityId: number().required(),
    caption: string(),
    category: mixed().oneOf(Object.values(MEDIUM_CATEGORY)),
    type: mixed().oneOf(Object.values(MEDIUM_TYPE)).required(),
    status: mixed().oneOf(Object.values(STATUS_ACTIVE)).required(),
    filename: string(),
    extension: string(),
    accept: string(),
    dropzone: mixed().required()
  })
  .required()
