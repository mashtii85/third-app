/**
 * Components - Lessons - View - Helper
 */

// React
import { MouseEvent, useContext } from 'react'

// UI
import { Button, ButtonToolbar, OffCanvasContext } from '@drykiss/industry-ui'
import { LessonForm } from '../form/create/form'
import { MediaForm } from '../../media/forms/create/form'

// Constants
import { THEME_CONTEXT } from '../../../constants/themeContext'

// types
import { LessonDetailsToolbarType } from './types.d'
import { offCanvasType } from '../../../types/offCanvas.d'
import { LessonFormType } from '../form/create/types.d'
import { MediaFilter } from '../../media/hooks/useMedia/types.d'
import { DropzoneProps, Medium } from '../../../types/medium.d'
import { MediaFormType } from '../../media/forms/create/types'

export const getLatestMedium = (media: Medium[]): Medium | undefined => {
  if (media?.length > 0) {
    const shouldBeSelectedId = Math.max.apply(
      Math,
      media!.map((medium) => {
        return medium.id!
      })
    )
    return media.find((medium) => medium.id === shouldBeSelectedId)
  }
  return undefined
}

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

export const LessonMediaContentToolbar = ({
  filters,
  defaultValues,
  dropzoneProps
}: {
  filters: Partial<MediaFilter>
  defaultValues: MediaFormType
  dropzoneProps: DropzoneProps
}) => {
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)

  const handleUpload = (e: MouseEvent<HTMLElement>): void => {
    e.stopPropagation()
    offCanvas.show({
      title: 'Edit',
      submit: false,
      content: (
        <MediaForm
          filters={filters}
          dropzoneProps={dropzoneProps}
          defaultValues={defaultValues}
          onSuccess={offCanvas.close}
        />
      )
    })
  }

  return (
    <ButtonToolbar>
      <Button
        context={THEME_CONTEXT.dark}
        onClick={handleUpload}
        size="sm"
        startIcon="file-upload"
      />
    </ButtonToolbar>
  )
}
