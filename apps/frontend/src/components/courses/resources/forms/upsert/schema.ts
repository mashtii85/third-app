/**
 * Components - Course - Resources - Forms - Create - Schema
 */

// Yup
import { mixed, object, string } from 'yup'

// Constants
import { POST_TYPE, STATUS_ACTIVE } from '@availabletowork/constants'

export const ResourcesSchema = object()
  .shape({
    title: string().required(),
    type: mixed().oneOf(Object.values(POST_TYPE)),
    content: string(),
    status: mixed().oneOf(Object.values(STATUS_ACTIVE))
  })
  .required()
