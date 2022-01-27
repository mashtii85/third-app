/**
 * Components - Lessons - Questions - Lists - Table
 */

// Hooks
import { useTaxonomies } from '../../../../../../../taxonomies/hooks'

// Types
import { LessonQuestionTableProps, TaxonomyFilters } from '@availabletowork/types'

// UI
import { QuestionRow } from './components/question/questionRow'

export const LessonQuestionsTable = (tableProps: LessonQuestionTableProps) => {
  const taxonomiesVariable: TaxonomyFilters = {
    type: tableProps.type,
    entity: tableProps.entity,
    entityId: tableProps.entityId
  }

  const { taxonomies, refetch } = useTaxonomies(taxonomiesVariable)

  return (
    <>
      {taxonomies && taxonomies.length
        ? taxonomies?.map((taxonomy) => {
            return (
              <QuestionRow
                key={taxonomy.id}
                question={taxonomy}
                answers={taxonomy.taxonomies}
                onSuccess={refetch}
              />
            )
          })
        : 'No Questions'}
    </>
  )
}
