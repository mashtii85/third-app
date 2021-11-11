/**
 * Components - Lessons - View - Components - Assignment - Forms - Upsert - Schema
 */

// Yup
import { object, number, array } from 'yup'

// TODO: Should change
export const AnswersSchema = object()
  .shape({
    meta: object().shape({
      answer_types: array().min(1).required(),
      score: number().required()
    })
  })
  .required()
