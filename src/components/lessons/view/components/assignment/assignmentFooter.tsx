/**
 * Components - Lessons - View - Components - Assignment - Footer
 */

// React
import { useContext } from 'react'

// UI
import { Details2, OffCanvasContext } from '@drykiss/industry-ui'
import { SimulatedLink } from '../quiz/questions/lists/table/components/question/customDOMs'
import { AssignmentAnswerForm } from './forms/upsert/form'

// Constants
import { ENTITIES } from '../../../../../constants/entities'

// Types
import { Taxonomy, TAXONOMY_TYPE } from '../../../../../types/taxonomy.d'
import { offCanvasType } from '../../../../../types/offCanvas.d'
import { Lesson } from '../../../../../types/lesson.d'
import { CurrentUser } from '../../../../../types/user.d'
import { STATUS_ACTIVE } from '../../../../../types/select.d'
import { ANSWER_TYPE } from './forms/upsert/types.d'

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
    const defaultValues: Partial<Taxonomy> = answer ?? {
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
      <Details2
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
