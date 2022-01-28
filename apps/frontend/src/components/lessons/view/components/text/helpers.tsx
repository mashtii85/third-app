/**
 * Components - Lessons - Components - Text - Helper
 */

// React
import { MouseEvent, useState } from 'react'

// UI
import { Button, ButtonToolbar } from '@drykiss/industry-ui'

// Constants
import { THEME_CONTEXT } from '@availabletowork/constants'

export const LessonTextualContentToolbar = ({
  isEditMode,
  onClick
}: {
  isEditMode: boolean
  onClick: (editMode: boolean) => void
}) => {
  const [editMode, setEditMode] = useState<boolean>(isEditMode)
  const handleEdit = (e: MouseEvent<HTMLElement>): void => {
    e.stopPropagation()
    setEditMode(true)
    onClick(true)
  }

  const handleCancel = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    setEditMode(false)
    onClick(false)
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
        <Button context={THEME_CONTEXT.secondary} onClick={handleEdit} size="sm" startIcon="edit" />
      )}
    </ButtonToolbar>
  )
}
