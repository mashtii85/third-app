/**
 * Components - Lessons - Components - Document
 */

// UI
import { Details2 } from '@drykiss/industry-ui'
import DocumentViewer from '../../../../common/docViewer/docViewer'

// Hooks
import { useMedia } from '../../../../media/hooks/useMedia/useMedia'

// Helpers
import { LessonMediaContentToolbar } from '../../helpers'

// Types
import { MediaFilter, UseMediaProps } from '../../../../media/hooks/useMedia/types.d'
import { STATUS_ACTIVE } from '../../../../../types/select.d'
import { DropzoneProps, MEDIUM_TYPE } from '../../../../../types/medium.d'
import { MediaFormType } from '../../../../media/forms/create/types.d'
import { LESSON_TYPE } from '../../../../../types/lesson.d'

export const LessonDocument = ({
  filters,
  lessonType
}: {
  filters: UseMediaProps
  lessonType: LESSON_TYPE
}) => {
  const { mediaList } = useMedia(filters)
  const medium = mediaList?.find((mdum) => mdum.filename && mdum.status === STATUS_ACTIVE.Active)

  const mediaFilters: Partial<MediaFilter> = {
    entity: filters.entity,
    entityId: filters.entityId,
    category: filters.category,
    type: filters.type
  }
  const defaultValues: MediaFormType = {
    entity: filters.entity,
    entityId: filters.entityId,
    category: filters.category!,
    status: STATUS_ACTIVE.Active,
    type: MEDIUM_TYPE.Document
  }
  let accept
  switch (lessonType) {
    case LESSON_TYPE.PowerPoint:
      accept = '.ppt,.pptx'
      break
    case LESSON_TYPE.Pdf:
    default:
      accept = '.pdf'
      break
  }
  const dropzoneProps: DropzoneProps = {
    accept: accept,
    disabled: false,
    multiple: false
  }

  return (
    <>
      <Details2
        open
        key={`document-content-${filters.entityId}`}
        title="Document"
        toolbar={
          <LessonMediaContentToolbar
            key={`document-content-toolbar-${filters.entityId}`}
            filters={mediaFilters}
            defaultValues={defaultValues}
            dropzoneProps={dropzoneProps}
          />
        }
      >
        <>
          {medium ? (
            <DocumentViewer
              docs={[
                {
                  uri: `${process.env.NEXT_PUBLIC_S3_CDN_URL}/${medium?.filename}`
                }
              ]}
            />
          ) : (
            'No Document'
          )}
        </>
      </Details2>
    </>
  )
}
