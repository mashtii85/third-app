/**
 * Components - Lessons - View - Helper
 */

// React
import { MouseEvent, useContext } from 'react'

// Hooks
// import { useUpdateLesson } from '../hooks/useUpdate/useUpdate'

// UI
import { Button, ButtonToolbar, OffCanvasContext } from '@drykiss/industry-ui'
import { LessonForm } from '../form/create/form'

// Constants
import { THEME_CONTEXT } from '../../../constants/themeContext'

// types
import { LessonDetailsToolbarType } from './types.d'
import { offCanvasType } from '../../../types/offCanvas.d'
import { LessonFormType } from '../form/create/types'

export const LessonDetailsToolbar = ({
  lessonDetailsToolbarProps
}: {
  lessonDetailsToolbarProps: Partial<LessonDetailsToolbarType>
}) => {
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)
  const filters = { id: lessonDetailsToolbarProps.id }
  const defaultValues: Partial<LessonFormType> = {
    id: lessonDetailsToolbarProps.id,
    title: lessonDetailsToolbarProps.title,
    description: lessonDetailsToolbarProps.description,
    type: lessonDetailsToolbarProps.type,
    status: lessonDetailsToolbarProps.status
  }
  const handleClick = (e: MouseEvent<HTMLElement>): void => {
    e.stopPropagation()
    offCanvas.show({
      content: (
        <LessonForm onSuccess={offCanvas.close} filters={filters} defaultValues={defaultValues} />
      ),
      submit: true,
      title: 'Edit'
    })
  }

  return (
    <ButtonToolbar>
      <Button context={THEME_CONTEXT.secondary} onClick={handleClick} size="sm" startIcon="edit" />
    </ButtonToolbar>
  )
}
