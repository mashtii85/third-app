/**
 * Components - Lessons - Questions - Lists - Table
 */

// Apollo
import { useTaxonomies } from '../../../../../../../taxonomies/hooks'

// Types
import { LessonQuestionTableProps } from './type.d'
import { UseTaxonomiesVariable } from '../../../../../../../taxonomies/hooks/useTaxonomies/types.d'
import { QuestionRow } from './components/question/questionRow'

export const LessonQuestionsTable = (tableProps: LessonQuestionTableProps) => {
  const taxonomiesVariable: UseTaxonomiesVariable = {
    category: tableProps.type,
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
