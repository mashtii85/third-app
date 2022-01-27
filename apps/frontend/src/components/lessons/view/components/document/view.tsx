/**
 * Components - Lessons - Components - Document
 */

// UI
import { Details } from '@drykiss/industry-ui'
import DocumentViewer from '../../../../common/docViewer/docViewer'

// Hooks
import { useMedia } from '../../../../media/hooks/useMedia/useMedia'

// Helpers
import { doesFileExist, LessonMediaContentToolbar } from '../../helpers'

//Constants
import { MediaFilter, STATUS_ACTIVE } from '@availabletowork/types'

// Types
import {
  DropzoneProps,
  LESSON_TYPE,
  MediaFormType,
  MEDIUM_TYPE,
  UseMediaProps
} from '@availabletowork/types'
import { useEffect } from 'react'

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
  const defaultValues: Partial<MediaFormType> = {
    entity: filters.entity,
    entityId: filters.entityId,
    category: filters.category,
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

  const fileUrl = `${process.env.NEXT_PUBLIC_S3_CDN_URL}/${medium?.filename}`
  let fileExist = false
  useEffect(() => {
    fileExist = doesFileExist(fileUrl)
  }, [])

  return (
    <>
      <Details
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
        <>{fileExist ? <DocumentViewer docs={[{ uri: fileUrl }]} /> : 'No Document'}</>
      </Details>
    </>
  )
}
