/**
 * Components - Lesson - View - Components - Quiz - Questions - Hooks - useDelete
 */

import { ENTITIES } from '../../constants'
import { UseHookOutput, UseHookProps } from '../general'
import { Taxonomy, TAXONOMY_TYPE } from '../taxonomies'

export interface AnswersData {
  taxonomies: Taxonomy[]
}

export interface UseDeleteAnswerOutput extends UseHookOutput {
  deleteAnswer: any
}

export interface DeleteAnswerPropsData {
  taxonomy: Taxonomy
}

export interface UseDeleteAnswerProps extends UseHookProps<DeleteAnswerPropsData> {
  type: TAXONOMY_TYPE
  entity: ENTITIES
  entityId: number
  parentId: number
}
