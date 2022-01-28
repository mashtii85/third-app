/**
 * Components - Lessons - Components - Text
 */

// React
import { MouseEvent, useState } from 'react'

// Styles
import styled from 'styled-components'

// UI
import { Details, Button, ButtonToolbar, Space } from '@drykiss/industry-ui'
import { LessonContentEdit } from '../../../form/edit/contentForm'
import { AssignmentFooter } from './assignmentFooter'

// Constants
import { THEME_CONTEXT } from '@availabletowork/constants'

// Types
import { CurrentUser, Lesson, UpdateLessonFormType } from '@availabletowork/types'

export const LessonAssignment = ({
  user,
  lesson,
  onsuccess
}: {
  user: CurrentUser
  lesson: Lesson
  onsuccess: () => void
}) => {
  const [editMode, setEditMode] = useState<boolean>(false)

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

  const defaultValues: UpdateLessonFormType = {
    id: lesson?.id,
    type: lesson?.type,
    content: lesson?.content
  }

  const onSuccess = () => {
    setEditMode(false)
  }

  return (
    <>
      <Details
        open
        key={`textual-content-${lesson.id}`}
        title="Assignment"
        toolbar={<LessonTextualContentToolbar key={`textual-content-toolbar-${lesson.id}`} />}
      >
        <>
          {editMode ? (
            <LessonContentEdit
              key="lesson-assignment-edit"
              onSuccess={onSuccess}
              defaultValues={defaultValues}
            />
          ) : (
            <StyledContent>{lesson.content ?? 'No Assignment'}</StyledContent>
          )}
          <Space />
          <AssignmentFooter
            key="assignment-footer"
            user={user}
            lesson={lesson}
            onSuccess={onsuccess}
          />
        </>
      </Details>
    </>
  )
}

const StyledContent = styled.div`
  white-space: pre-wrap;
`
