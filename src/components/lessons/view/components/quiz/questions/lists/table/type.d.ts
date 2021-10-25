/**
 * Components - Lessons - Questions - Lists - Table - Types
 */

import { ENTITIES } from '../../../../../../../../constants/entities'
import { TAXONOMY_TYPE } from '../../../../../../../../types/taxonomy.d'

export interface LessonQuestionTableProps {
  type: TAXONOMY_TYPE
  entity: ENTITIES
  entityId: number
}
