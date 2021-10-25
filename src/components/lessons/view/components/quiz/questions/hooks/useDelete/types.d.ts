/**
 * Components - Lesson - View - Components - Quiz - Questions - Hooks - useDelete
 */

import { ENTITIES } from '../../../../../../../../constants/entities'
import { UseHookOutput, UseHookProps } from '../../../../../../../../types/hook.d'
import { Answer, TAXONOMY_TYPE } from '../../../../../../../../types/taxonomy.d'

export interface AnswersData {
  taxonomies: Answer[]
}

export interface UseDeleteAnswerOutput extends UseHookOutput {
  deleteAnswer: any
}

export interface DeleteAnswerPropsData {
  taxonomy: Answer
}

export interface UseDeleteAnswerProps extends UseHookProps<DeleteAnswerPropsData> {
  type: TAXONOMY_TYPE
  entity: ENTITIES
  entityId: number
  parentId: number
}
