/**
 * Components - Lessons - Components - Video
 */

// UI
import { Details2 } from '@drykiss/industry-ui'
import VideoPlayer from '../../../../common/videoPlayer/videoPlayer'

// Hooks
import { useMedia } from '../../../../media/hooks/useMedia/useMedia'

// Helpers
import { LessonMediaContentToolbar } from '../../helpers'
import { parseVideos } from '../../../../courses/helpers'

// Types
import { MediaFilter, UseMediaProps } from '../../../../media/hooks/useMedia/types.d'
import { STATUS_ACTIVE } from '../../../../../types/select.d'
import { DropzoneProps, MEDIUM_TYPE } from '../../../../../types/medium.d'
import { MediaFormType } from '../../../../media/forms/create/types.d'

export const LessonVideo = ({ filters }: { filters: UseMediaProps }) => {
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
    type: MEDIUM_TYPE.Video
  }
  const dropzoneProps: DropzoneProps = {
    accept: 'video/*',
    disabled: false,
    multiple: false
  }

  return (
    <>
      <Details2
        open
        key={`video-content-${filters.entityId}`}
        title="Video"
        toolbar={
          <LessonMediaContentToolbar
            key={`video-content-toolbar-${filters.entityId}`}
            filters={mediaFilters}
            defaultValues={defaultValues}
            dropzoneProps={dropzoneProps}
          />
        }
      >
        <>{medium ? <VideoPlayer videos={parseVideos([medium])} /> : 'No Video'}</>
      </Details2>
    </>
  )
}
