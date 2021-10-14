/**
 * Components - Lessons - View - Helper
 */

// React
import { MouseEvent, useContext } from 'react'

// UI
import { Text, Row, Column, Button, ButtonToolbar, OffCanvasContext } from '@drykiss/industry-ui'
import { LessonForm } from '../form/create/form'
import { MediaForm } from '../../media/forms/create/form'

// Constants
import { THEME_CONTEXT } from '../../../constants/themeContext'
import { ENTITIES } from '../../../constants/entities'

// types
import { LessonContentToolbarType, LessonDetailsToolbarType } from './types.d'
import { offCanvasType } from '../../../types/offCanvas.d'
import { LessonFormType } from '../form/create/types.d'
import { LESSON_TYPE } from '../../../types/lesson.d'
import { MediaFilter } from '../../media/hooks/useMedia/types.d'
import { DropzoneProps, Medium, MEDIUM_CATEGORY, MEDIUM_TYPE } from '../../../types/medium.d'
import { STATUS_ACTIVE } from '../../../types/select.d'
import { MediaFormType } from '../../media/forms/create/types'
import { SIZE } from '../../../config/theme'

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

export const LessonContentUpload = ({
  defaultValues
}: {
  defaultValues: LessonContentToolbarType
}) => {
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)

  const handleClick = () => {
    const mediaDefaultValues: MediaFormType = {
      entity: ENTITIES.Lesson,
      entityId: defaultValues.id,
      category: MEDIUM_CATEGORY.Lesson,
      status: STATUS_ACTIVE.Active,
      type: defaultValues.type === LESSON_TYPE.Video ? MEDIUM_TYPE.Video : MEDIUM_TYPE.Document
    }
    const dropzoneProps: DropzoneProps = {
      accept:
        defaultValues.type === LESSON_TYPE.Video
          ? 'video/*'
          : defaultValues.type === LESSON_TYPE.Pdf
            ? '.pdf'
            : '.ppt,.pptx',
      disabled: false,
      multiple: false
    }
    const filters: Partial<MediaFilter> = {
      entity: mediaDefaultValues.entity,
      entityId: mediaDefaultValues.entityId,
      category: mediaDefaultValues.category,
      type: mediaDefaultValues.type
    }
    offCanvas.show({
      title: 'Edit',
      submit: false,
      content: (
        <MediaForm
          filters={filters}
          dropzoneProps={dropzoneProps}
          defaultValues={mediaDefaultValues}
          onSuccess={offCanvas.close}
        />
      )
    })
  }
  return (
    <>
      <Row>
        <Column md={10}>
          <Text>{defaultValues?.caption}</Text>
        </Column>
        <Column md={2}>
          <ButtonToolbar align="flex-end">
            <Button
              content={`Upload ${defaultValues.type}`}
              context={THEME_CONTEXT.secondary}
              size={SIZE.SM}
              onClick={() => handleClick()}
            />
          </ButtonToolbar>
        </Column>
      </Row>
    </>
  )
}
