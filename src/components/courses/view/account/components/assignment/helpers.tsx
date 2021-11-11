/**
 * Components - Cources - View - Account - Components - Assignment - Helpers
 */

// Hooks
import { useDeleteMedia } from '../../../../../media/hooks/useDelete/useDelete'

// UI
import { Details2, Space, useOffCanvas, ButtonToolbar, Button } from '@drykiss/industry-ui'
import { MediaForm } from '../../../../../media/forms/create/form'

// Constants
import { ENTITIES } from '../../../../../../constants/entities'
import { SIZE } from '../../../../../../config/theme'
import { THEME_CONTEXT } from '../../../../../../constants/themeContext'

// Types
import {
  MEDIUM_CATEGORY,
  MEDIUM_TYPE,
  DropzoneProps,
  Medium
} from '../../../../../../types/medium.d'
import { STATUS_ACTIVE } from '../../../../../../types/select.d'
import { MediaFormType } from '../../../../../media/forms/create/types.d'
import { MediaFilter } from '../../../../../media/hooks/useMedia/types.d'
import { AssignmentActionTypes, AssignmentState } from './types.d'
import { MediaDeleteProps } from '../../../../../media/hooks/useDelete/types.d'
import { GraphqlWhere } from '../../../../../../types/gql.d'

const translateMediumType = (mediumType: MEDIUM_TYPE): string => {
  switch (mediumType) {
    case MEDIUM_TYPE.Document:
      return '.pdf,.ppt,.pptx'
    case MEDIUM_TYPE.Image:
      return 'image/*'
    case MEDIUM_TYPE.Video:
      return 'video/*'
  }
}

export const Buttons = ({
  clientId,
  taxonomyId,
  lessonId,
  state,
  onStateChanged
}: {
  clientId: number
  taxonomyId: number
  lessonId: number
  state: AssignmentState
  onStateChanged: (action: AssignmentActionTypes) => void
}) => {
  const offCanvas = useOffCanvas()

  const mediaDeleteProps: Partial<MediaDeleteProps> = {
    clientId: clientId,
    taxonomyId: taxonomyId,
    entity: ENTITIES.Lesson,
    entityId: lessonId
  }

  const { deleteMedia } = useDeleteMedia(mediaDeleteProps, {
    onCompleted: () => { },
    onError: (error) => {
      console.error(error)
    }
  })

  const handleFileUpload = (mediumType: MEDIUM_TYPE) => {
    const handleSuccess = ({ media: { returning } }: { media: { returning: Medium[] } }) => {
      offCanvas.close()
      onStateChanged({
        type: 'upload',
        payload: returning && returning.length > 0 ? returning[0].caption! : ''
      })
    }

    const defaultValues: MediaFormType = {
      taxonomyId: taxonomyId,
      entity: ENTITIES.Lesson,
      entityId: lessonId,
      category: MEDIUM_CATEGORY.Lesson,
      status: STATUS_ACTIVE.Active,
      type: mediumType
    }

    const dropzoneProps: DropzoneProps = {
      accept: translateMediumType(mediumType),
      disabled: false,
      multiple: false
    }

    const filters: Partial<MediaFilter> = {
      clientId: clientId,
      taxonomyId: taxonomyId,
      entity: defaultValues.entity,
      entityId: defaultValues.entityId,
      category: defaultValues.category,
      type: defaultValues.type
    }

    offCanvas.show({
      title: 'Assignment',
      submit: false,
      content: (
        <MediaForm
          filters={filters}
          dropzoneProps={dropzoneProps}
          defaultValues={defaultValues}
          onSuccess={handleSuccess}
        />
      )
    })
  }

  const handleRemoveFile = () => {
    const where: GraphqlWhere<Medium> = {
      client_id: { _eq: clientId },
      taxonomy_id: { _eq: taxonomyId },
      entity: { _eq: ENTITIES.Lesson },
      entity_id: { _eq: lessonId }
    }
    deleteMedia({ variables: { where } })

    const newState = { ...state }
    newState.fileCaption = ''
    newState.isFinished = false
    onStateChanged({ type: 'reset', payload: newState })
  }

  const handleFinish = () => {
    onStateChanged({ type: 'finish' })
  }

  const CustomButton = ({ type }: { type: MEDIUM_TYPE }) => {
    return (
      <Button
        key={`${type}-file-upload`}
        context={THEME_CONTEXT.secondary}
        size={SIZE.SM}
        content={type.replace(/(\w)(\w*)/g, (p0, p1, p2) => p1.toUpperCase() + p2.toLowerCase())}
        onClick={() => handleFileUpload(type)}
        disabled={state?.fileCaption && state.fileCaption !== ''}
      />
    )
  }

  return (
    <>
      {state?.fileCaption && state?.fileCaption !== '' && (
        <>
          <Details2
            open
            title="Uploaded file"
            toolbar={
              <ButtonToolbar>
                <Button
                  key="reset"
                  context={THEME_CONTEXT.warning}
                  size={SIZE.SM}
                  startIcon="trash"
                  onClick={handleRemoveFile}
                />
              </ButtonToolbar>
            }
          >
            {state.fileCaption}
          </Details2>
          <Space />
        </>
      )}
      <ButtonToolbar>
        {state.acceptableTypes.map((type) => (
          <CustomButton type={type} />
        ))}
        <Button
          key="finish"
          context={THEME_CONTEXT.secondary}
          size={SIZE.SM}
          content="Continue"
          onClick={handleFinish}
          disabled={!state?.fileCaption || state?.fileCaption === ''}
        />
      </ButtonToolbar>
    </>
  )
}
