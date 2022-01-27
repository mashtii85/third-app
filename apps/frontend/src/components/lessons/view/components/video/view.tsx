/**
 * Components - Lessons - Components - Video
 */

// UI
import { Details } from '@drykiss/industry-ui'
import VideoPlayer from '../../../../common/videoPlayer/videoPlayer'

// Hooks
import { useMedia } from '../../../../media/hooks/useMedia/useMedia'

// Helpers
import { LessonMediaContentToolbar } from '../../helpers'
import { parseVideos } from '../../../../courses/helpers'

// Constants
import { ENTITIES, STATUS_ACTIVE } from '@availabletowork/types'

// Types
import {
  DropzoneProps,
  MediaFilter,
  MediaFormType,
  Medium,
  MEDIUM_CATEGORY,
  MEDIUM_TYPE,
  Subtitle,
  UseMediaProps
} from '@availabletowork/types'

export const LessonVideo = ({
  medium,
  filters
}: {
  medium: Medium | undefined
  filters: UseMediaProps
}) => {
  const subtitleFilter: UseMediaProps = {
    entity: ENTITIES.Medium,
    entityId: medium?.id,
    category: MEDIUM_CATEGORY.Lesson,
    type: MEDIUM_TYPE.Document
  }
  const { mediaList } = useMedia(subtitleFilter)
  const media = mediaList?.filter((mdum) => mdum.filename && mdum.status === STATUS_ACTIVE.Active)

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
    type: MEDIUM_TYPE.Video
  }
  const dropzoneProps: DropzoneProps = {
    accept: 'video/*',
    disabled: false,
    multiple: false
  }

  const subtitles: Subtitle[] = media?.map((item, index) => {
    return {
      label: `sub-${index}`,
      kind: 'captions',
      src: `${process.env.NEXT_PUBLIC_S3_CDN_URL}/${item?.filename}`,
      srcLang: 'en',
      mode: 'showing',
      default: true
    }
  })

  return (
    <>
      <Details
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
        <>
          {medium && subtitles?.length > 0 ? (
            <VideoPlayer videos={parseVideos([medium])} subtitles={subtitles} />
          ) : (
            'No Video'
          )}
        </>
      </Details>
    </>
  )
}
