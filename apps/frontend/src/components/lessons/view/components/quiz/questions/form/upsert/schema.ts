/**
 * Components - Lessons - Questions - Form - Upsert - Schema
 */

// Yup
import { mixed, object, string, number, SchemaOf } from 'yup'

// Types
import { QuestionUpsertType, QUESTION_TYPE } from '@availabletowork/types'

export const QuestionUpsertSchema: SchemaOf<QuestionUpsertType> = object()
  .shape({
    name: string().required(),
    meta: object().shape({
      type: mixed().oneOf(Object.values(QUESTION_TYPE)).required(),
      score: number().required()
    })
  })
  .required()
