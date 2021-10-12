/**
 * Components - Courses - View - Client - Tabs - Helper
 */

// React
import { MouseEvent, useContext } from 'react'

// UI
import { Button, ButtonToolbar, OffCanvasContext } from '@drykiss/industry-ui'

// Forms
import { CourseForm } from '../../../forms'

// types
import { CourseToolbarType } from './types.d'
import { offCanvasType } from '../../../../../types/offCanvas.d'

// Constants
import { THEME_CONTEXT } from '../../../../../constants/themeContext'

export const Toolbar = ({ courseToolbarProps }: { courseToolbarProps: CourseToolbarType }) => {
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)

  const taxonomy = courseToolbarProps.defaultValues?.taxonomy && {
    value: courseToolbarProps.defaultValues.taxonomy?.id,
    label: courseToolbarProps.defaultValues.taxonomy?.name
  }
  const defaultValues = { ...courseToolbarProps!.defaultValues, taxonomy }

  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    offCanvas.show({
      content: (
        <CourseForm
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
