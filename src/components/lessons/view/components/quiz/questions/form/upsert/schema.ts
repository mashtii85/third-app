/**
 * Components - Lessons - Questions - Form - Upsert - Schema
 */

// Yup
import { mixed, object, string, number, SchemaOf } from 'yup'

// Type
import { QuestionUpsertType, QUESTION_TYPE } from './type.d'

export const QuestionUpsertSchema: SchemaOf<QuestionUpsertType> = object()
  .shape({
    name: string().required(),
    meta: object().shape({
      type: mixed().oneOf(Object.values(QUESTION_TYPE)).required(),
      score: number().required()
    })
  })
  .required()
