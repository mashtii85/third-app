/**
 * Components - Lessons - View
 */

// React
import { MouseEvent, useState } from 'react'

// Next
import { useRouter } from 'next/router'

// UI
import {
  Row,
  Column,
  Space,
  Heading,
  Details2,
  DetailsText,
  Link,
  formatDateStandard,
  formatTime,
  ButtonToolbar,
  Button,
  Divider
} from '@drykiss/industry-ui'
import { LessonContentEdit } from '../form/edit/contentForm'
import VideoPlayer from '../../common/videoPlayer/videoPlayer'
import DocumentViewer from '../../common/docViewer/docViewer'

// Hooks
import { useLessons } from '../hooks/useLessons'
import { useMedia } from '../../media/hooks/useMedia/useMedia'

// Pages
import pages from '../../../config/pages'

// Helpers
import { LessonDetailsToolbar, LessonContentUpload } from './helpers'
import { parseVideos } from '../../courses/helpers'

// Constants
import { ENTITIES } from '../../../constants/entities'

// Types
import { LessonFilter } from '../hooks/types.d'
import { LessonContentToolbarType, LessonDetailsToolbarType } from './types'
import { THEME_CONTEXT } from '../../../constants/themeContext'
import { LESSON_TYPE } from '../../../types/lesson.d'
import { SIZE } from '../../../config/theme'
import { Medium, MEDIUM_CATEGORY, MEDIUM_TYPE } from '../../../types/medium.d'
import { STATUS_ACTIVE } from '../../../types/select.d'
import { UseMediaProps } from '../../media/hooks/useMedia/types.d'

export const LessonView = () => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const { query } = useRouter()
  const lessonId: number = +(query?.id || '0')

  const filters: Partial<LessonFilter> = { id: lessonId }
  const { lessonList } = useLessons(filters)

  const mediaFilters: UseMediaProps = {
    entity: ENTITIES.Lesson,
    entityId: lessonId,
    category: MEDIUM_CATEGORY.Lesson,
    type: lessonList[0]?.type === LESSON_TYPE.Video ? MEDIUM_TYPE.Video : MEDIUM_TYPE.Document
  }
  const { mediaList } = useMedia(mediaFilters)
  const medium: Medium | undefined = mediaList?.find(
    (mdum) => mdum.filename && mdum.status === STATUS_ACTIVE.Active
  )

  if (!lessonList || !lessonList[0]) return null
  const lesson = lessonList[0]

  const lessonDetailsToolbarProps: Partial<LessonDetailsToolbarType> = {
    id: lessonId,
    title: lesson.title,
    description: lesson.description,
    type: lesson.type,
    status: lesson.status
  }

  const LessonContentToolbar = () => {
    const handleCancel = (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation()
      setEditMode(false)
    }
    const handleEdit = (e: MouseEvent<HTMLElement>): void => {
      e.stopPropagation()
      setEditMode(true)
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
          <Button
            context={THEME_CONTEXT.secondary}
            onClick={handleEdit}
            size="sm"
            startIcon="edit"
          />
        )}
      </ButtonToolbar>
    )
  }

  const defaultValues: LessonContentToolbarType = {
    id: lessonId,
    caption: medium?.caption,
    type: lesson.type,
    content: lesson.content
  }

  const onSuccess = () => {
    setEditMode(false)
  }

  return (
    <Row>
      <Column md={12}>
        <Row>
          <Column md={12}>
            <Heading tag="h2" content={lesson?.title} />
            <Link
              to={`${pages.dashboard.coursesClient.view_by_id}?id=${lesson.course_id}&tab=curriculum`}
            >
              Back to curriculum
            </Link>
            <Space />
          </Column>
        </Row>
        <Row>
          <Column md={3}>
            <Details2
              open
              key={`details-${lessonId}`}
              title="Details"
              toolbar={
                <LessonDetailsToolbar
                  key={`details-toolbar-${lessonId}`}
                  lessonDetailsToolbarProps={lessonDetailsToolbarProps}
                />
              }
            >
              <DetailsText
                key={`date-${lessonId}`}
                content="Date"
                text={`${formatDateStandard(lesson.created_at)} ${formatTime(lesson.created_at)}`}
              />
              <DetailsText
                key={`desc-${lessonId}`}
                content="Description"
                text={lesson?.description ?? ''}
              />
              <DetailsText key={`type-${lessonId}`} content="Type" text={lesson?.type} />
              <DetailsText key={`status-${lessonId}`} content="Status" text={lesson?.status} />
            </Details2>
          </Column>
          <Column md={9}>
            <Details2
              open
              key={`content-${lessonId}`}
              title="Content"
              toolbar={<LessonContentToolbar key={`content-toolbar-${lessonId}`} />}
            >
              <>
                {editMode ? (
                  <>
                    <>
                      {(lesson.type === LESSON_TYPE.Video ||
                        lesson.type === LESSON_TYPE.Pdf ||
                        lesson.type === LESSON_TYPE.PowerPoint) && (
                          <LessonContentUpload
                            key="lesson-content-upload"
                            defaultValues={defaultValues}
                          />
                        )}
                      <Space />
                      <Divider size={SIZE.SM} />
                    </>
                    <LessonContentEdit
                      key="lesson-content-edit"
                      onSuccess={onSuccess}
                      defaultValues={defaultValues}
                    />
                  </>
                ) : (
                  <>
                    {medium && (
                      <>
                        {lesson.type === LESSON_TYPE.Video && (
                          <VideoPlayer videos={parseVideos([medium])} />
                        )}
                        {(lesson.type === LESSON_TYPE.Pdf ||
                          lesson.type === LESSON_TYPE.PowerPoint) && (
                            <DocumentViewer
                              docs={[
                                {
                                  uri: `${process.env.NEXT_PUBLIC_S3_CDN_URL}/${medium?.filename}`
                                }
                              ]}
                            />
                          )}
                        <Space />
                        <Divider size={SIZE.SM} />
                      </>
                    )}
                    {lesson?.content}
                  </>
                )}
              </>
            </Details2>
          </Column>
        </Row>
      </Column>
    </Row>
  )
}
