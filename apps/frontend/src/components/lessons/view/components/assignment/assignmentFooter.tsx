/**
 * Components - Lessons - View - Components - Assignment - Footer
 */

// React
import { useContext } from 'react'

// UI
import { Details, OffCanvasContext } from '@drykiss/industry-ui'
import { SimulatedLink } from '../quiz/questions/lists/table/components/question/customDOMs'
import { AssignmentAnswerForm } from './forms/upsert/form'

// Constants
import { ENTITIES, STATUS_ACTIVE } from '@availabletowork/types'

// Types
import {
  ANSWER_TYPE,
  CurrentUser,
  Lesson,
  offCanvasType,
  Taxonomy,
  TAXONOMY_TYPE
} from '@availabletowork/types'

export const AssignmentFooter = ({
  user,
  lesson,
  onSuccess
}: {
  user: CurrentUser
  lesson: Lesson
  onSuccess: () => void
}) => {
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)

  const answer = lesson.taxonomies?.find(
    (taxonomy) => taxonomy.meta?.type === ANSWER_TYPE.Assignment
  )

  const handleSuccess = () => {
    offCanvas.close()
    onSuccess()
  }

  const handleManageAnswers = () => {
    const defaultValues = answer
      ? {}
      : {
          client_id: user.client_id,
          entity_id: lesson.id,
          entity: ENTITIES.Lesson,
          name: 'Assignment answer',
          status: STATUS_ACTIVE.Active,
          type: TAXONOMY_TYPE.LessonAnswers,
          meta: { type: ANSWER_TYPE.Assignment }
        }
    offCanvas.show({
      title: 'Edit Properties',
      submit: true,
      content: (
        <AssignmentAnswerForm
          key="assignment-answer-form"
          defaultValues={defaultValues}
          onSuccess={handleSuccess}
        />
      )
    })
  }

  // const assignmentAnswer = (): string => {
  //   const types = answer?.meta?.answer_types
  //   const score = answer?.meta?.score
  //   return types && types.length > 0
  //     ? `Types: ${types.join()}, Score: ${score ?? 0}`
  //     : 'No answer'
  // }

  return (
    <>
      <Details
        key="footer"
        title={
          <SimulatedLink key="manage-answer" onClick={handleManageAnswers}>
            <b>+ Edit Properties</b>
          </SimulatedLink>
        }
        toolbar={
          answer?.meta?.answer_types
            ? `Types: ${answer?.meta?.answer_types} | Score: ${answer?.meta?.score ?? 0}`
            : 'No answer'
        }
      />
    </>
  )
}
