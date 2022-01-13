/**
 * Components - Course - Resources - Forms - Create - Schema
 */

// Yup
import { mixed, object, string } from 'yup'

// Types
import { POST_TYPE } from '../../../../../../src/types/post.d'
import { STATUS_ACTIVE } from '../../../../../../src/types/select.d'

export const ResourcesSchema = object()
  .shape({
    title: string().required(),
    type: mixed().oneOf(Object.values(POST_TYPE)),
    content: string(),
    status: mixed().oneOf(Object.values(STATUS_ACTIVE))
  })
  .required()
