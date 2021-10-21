/**
 * Components - Lessons - Components - Text
 */

// React
import { MouseEvent, useState } from 'react'

// UI
import { Details2, Button, ButtonToolbar } from '@drykiss/industry-ui'
import { LessonContentEdit } from '../../../form/edit/contentForm'

// Hooks
import { useLessons } from '../../../hooks/useLessons'

// Constants
import { THEME_CONTEXT } from '../../../../../constants/themeContext'

// Types
import { LessonFilter } from '../../../hooks/types.d'
import { LessonFormType } from '../../../form/edit/types.d'

export const LessonContent = ({ lessonId }: { lessonId: number }) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const filters: Partial<LessonFilter> = { id: lessonId }
  const { lessonList } = useLessons(filters)
  const lesson = lessonList[0]

  const LessonTextualContentToolbar = () => {
    const handleEdit = (e: MouseEvent<HTMLElement>): void => {
      e.stopPropagation()
      setEditMode(true)
    }

    const handleCancel = (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation()
      setEditMode(false)
    }

    return (
      <ButtonToolbar>
        {editMode ? (
          <Button
            context={THEME_CONTEXT.warning}
            onClick={handleCancel}
            size="sm"
            startIcon="times"
          />
        ) : (
          <Button
            context={THEME_CONTEXT.secondary}
            onClick={handleEdit}
            size="sm"
            startIcon="edit"
          />
        )}
      </ButtonToolbar>
    )
  }

  const defaultValues: LessonFormType = {
    id: lessonId,
    type: lesson.type,
    content: lesson.content
  }

  const onSuccess = () => {
    setEditMode(false)
  }

  return (
    <>
      <Details2
        open
        key={`textual-content-${lessonId}`}
        title="Content"
        toolbar={<LessonTextualContentToolbar key={`textual-content-toolbar-${lessonId}`} />}
      >
        <>
          {editMode ? (
            <LessonContentEdit
              key="lesson-content-edit"
              onSuccess={onSuccess}
              defaultValues={defaultValues}
            />
          ) : (
            <>{lesson.content ?? 'No Content'}</>
          )}
        </>
      </Details2>
    </>
  )
}
