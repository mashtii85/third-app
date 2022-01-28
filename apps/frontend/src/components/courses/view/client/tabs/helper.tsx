/**
 * Components - Courses - View - Client - Tabs - Helper
 */

// React
import { MouseEvent, useContext } from 'react'

// UI
import { Button, ButtonToolbar, OffCanvasContext } from '@drykiss/industry-ui'

// Forms
import { UpsertCourseForm } from '../../../forms'

// Constants
import { THEME_CONTEXT } from '@availabletowork/constants'

// types
import { CourseToolbarType, offCanvasType } from '@availabletowork/types'

export const Toolbar = ({ courseToolbarProps }: { courseToolbarProps: CourseToolbarType }) => {
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)

  const taxonomy = courseToolbarProps.defaultValues?.taxonomy && {
    value: courseToolbarProps.defaultValues.taxonomy?.id,
    label: courseToolbarProps.defaultValues.taxonomy?.name
  }
  const defaultValues = { ...courseToolbarProps.defaultValues, taxonomy }

  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    offCanvas.show({
      content: (
        <UpsertCourseForm
          filters={courseToolbarProps.filters}
          onSuccess={offCanvas.close}
          defaultValues={defaultValues}
        />
      ),
      submit: true,
      title: 'Edit course'
    })
  }

  return (
    <ButtonToolbar>
      <Button context={THEME_CONTEXT.secondary} onClick={handleClick} size="sm" startIcon="edit" />
    </ButtonToolbar>
  )
}
