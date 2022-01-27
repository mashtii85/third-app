/**
 * Components - Lessons - Questions - Lists - Table - Types
 */

//Types
import { ENTITIES } from '../../constants'
import { TAXONOMY_TYPE } from '../taxonomies'

export interface LessonQuestionTableProps {
  type: TAXONOMY_TYPE
  entity: ENTITIES
  entityId: number
}
