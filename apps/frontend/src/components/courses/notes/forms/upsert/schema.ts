/**
 * Components - Course - Notes - Forms - Create - Schema
 */

// Yup
import { object, string, SchemaOf } from 'yup'

// Types
import { NotesFormType } from './types.d'

export const NotesSchema: SchemaOf<NotesFormType> = object()
  .shape({
    title: string().required()
  })
  .required()
