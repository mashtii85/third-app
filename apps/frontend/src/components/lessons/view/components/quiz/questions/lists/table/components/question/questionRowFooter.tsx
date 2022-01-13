/**
 * Components - Lessons - Questions - Lists - Tables - Components - Question
 */

// React
import { useContext } from 'react'

// UI
import { Details, ButtonToolbar, Button, OffCanvasContext } from '@drykiss/industry-ui'
import { SimulatedLink } from './customDOMs'
import { LessonQuestionForm } from '../../../../form/upsert/form'
import { LessonQuestionDeleteForm } from '../../../../form/delete/delete'
import { AnswerForm } from '../../../../form/answers/form'

// Constants
import { SIZE } from '../../../../../../../../../../config/theme'
import { THEME_CONTEXT } from '../../../../../../../../../../constants/themeContext'

// Types
import { Taxonomy, TAXONOMY_TYPE } from '../../../../../../../../../../types/taxonomy.d'
import { QuestionUpsertType } from '../../../../form/upsert/type.d'
import { offCanvasType } from '../../../../../../../../../../types/offCanvas.d'
import { STATUS_ACTIVE } from '../../../../../../../../../../types/select.d'

export const QuestionRowFooter = ({
  question,
  onSuccess
}: {
  question: Taxonomy
  onSuccess: () => void
}) => {
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)

  const handleSuccess = () => {
    offCanvas.close()
    onSuccess()
  }

  const handleManageAnswers = () => {
    const filters: Partial<Taxonomy> = {
      client_id: question.client_id,
      entity_id: question.entity_id,
      entity: question.entity,
      parent_id: question.id,
      status: STATUS_ACTIVE.Active,
      type: TAXONOMY_TYPE.LessonAnswers,
      meta: question.meta
    }
    offCanvas.show({
      title: 'Manage Answers',
      submit: true,
      content: (
        <AnswerForm
          key="answer-form"
          filters={filters}
          defaultValues={question.taxonomies}
          onSuccess={handleSuccess}
        />
      )
    })
  }

  const handleEdit = (): void => {
    const filters: Partial<Taxonomy> = {
      id: question?.id,
      entity: question.entity,
      entity_id: question.entity_id,
      type: question.type
    }
    const defaultValues: QuestionUpsertType = {
      name: question.name ?? '',
      meta: {
        type: question?.meta?.type,
        score: question?.meta?.score
      }
    }

    offCanvas.show({
      title: 'Edit question',
      submit: true,
      content: (
        <LessonQuestionForm
          filters={filters}
          defaultValues={defaultValues}
          onSuccess={offCanvas.close}
        />
      )
    })
  }

  const handleDelete = (): void => {
    offCanvas.show({
      title: 'Delete Taxonomy',
      submit: false,
      content: (
        <LessonQuestionDeleteForm
          taxonomyId={question?.id}
          type={question?.type}
          entity={question.entity}
          entityId={question.entity_id}
          onSuccess={offCanvas.close}
        />
      )
    })
  }

  return (
    <>
      <Details
        key={`footer-${question.id}`}
        title={
          <SimulatedLink key={`link-${question.id}`} onClick={handleManageAnswers}>
            <b>+ Manage Answers</b>
          </SimulatedLink>
        }
        toolbar={
          <ButtonToolbar align="flex-start" size={SIZE.SM}>
            <Button
              context={THEME_CONTEXT.secondary}
              size={SIZE.SM}
              startIcon="edit"
              onClick={handleEdit}
            />
            <Button
              context={THEME_CONTEXT.warning}
              size={SIZE.SM}
              startIcon="trash"
              onClick={handleDelete}
            />
            <Button context={THEME_CONTEXT.white} size={SIZE.SM} startIcon="arrow-up" />
            <Button context={THEME_CONTEXT.white} size={SIZE.SM} startIcon="arrow-down" />
          </ButtonToolbar>
        }
      />
    </>
  )
}
