/**
 * Components - Courses - Resources - List - Table - Helper
 */

// React
import { MouseEvent, useContext } from 'react'

// UI
import { Button, ButtonToolbar, OffCanvasContext } from '@drykiss/industry-ui'

import { LessonQuestionForm } from './questions/form/upsert/form'

// Constants
import {
  offCanvasType,
  QuestionsListToolbarType,
  QuestionUpsertType,
  Taxonomy
} from '@availabletowork/types'

// Types
import { SIZE, THEME_CONTEXT } from '@availabletowork/types'

export const QuestionsListToolbar = (toolbarProps: QuestionsListToolbarType) => {
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)

  const handleSuccess = offCanvas.close

  const handleClick = (e: MouseEvent): void => {
    e.stopPropagation()
    const filters: Partial<Taxonomy> = {
      entity: toolbarProps.entity,
      entity_id: toolbarProps.entityId,
      type: toolbarProps.type,
      status: toolbarProps.status
    }
    const defaultValues: QuestionUpsertType = { name: '' }

    offCanvas.show({
      submit: true,
      title: 'Add Question',
      content: (
        <LessonQuestionForm
          filters={filters}
          defaultValues={defaultValues}
          onSuccess={handleSuccess}
        />
      )
    })
  }

  return (
    <ButtonToolbar>
      <Button context={THEME_CONTEXT.white} onClick={handleClick} size={SIZE.SM} startIcon="plus" />
    </ButtonToolbar>
  )
}
