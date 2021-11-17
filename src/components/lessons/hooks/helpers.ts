/**
 * Components - Lessons - Hooks - helpers
 */

// Types
import { GQLClause, GraphqlWhere } from '../../../types/gql.d'
import { Lesson } from '../../../types/lesson.d'
import { LessonFilter } from './useLesson/types.d'

export const prepareArguments = ({
  filters
}: {
  filters?: Partial<LessonFilter>
}): GQLClause<Lesson> => {
  const whereClause: GraphqlWhere<Lesson> = {}

  if (filters?.id) {
    whereClause.id = { _eq: filters.id }
  }

  if (filters?.moduleId) {
    whereClause.module_id = { _eq: filters.moduleId }
  }

  if (filters?.title) {
    whereClause.title = { _ilike: filters.title }
  }

  if (filters?.description) {
    whereClause.description = { _ilike: filters.description }
  }

  if (filters?.type) {
    whereClause.type = { _eq: filters.type }
  }

  if (filters?.content) {
    whereClause.content = { _ilike: filters.content }
  }

  if (filters?.status) {
    whereClause.status = { _eq: filters.status }
  }

  const variables: GQLClause<Lesson> = {
    where: whereClause
  }
  return variables
}
