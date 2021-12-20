/**
 * Components - Lessons - View - Components - Assignment - Forms - Upsert - Schema
 */

// Yup
import { object, number, array, SchemaOf } from 'yup'

// Types
import { AssignmentAnswerSubmitType } from './types.d'

export const AnswersSchema: SchemaOf<AssignmentAnswerSubmitType> = object()
  .shape({
    meta: object().shape({
      answer_types: array().min(1).required(),
      score: number().required()
    })
  })
  .required()
