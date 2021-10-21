/**
 * Components - Lessons - View
 */

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
  formatTime
} from '@drykiss/industry-ui'
import { LessonContent } from './components/text/view'
import { LessonVideo } from './components/video/view'
import { LessonDocument } from './components/document/view'
import { LessonQuiz } from './components/quiz/view'

// Hooks
import { useLessons } from '../hooks/useLessons'

// Pages
import pages from '../../../config/pages'

// Helpers
import { LessonDetailsToolbar } from './helpers'

// Constants
import { ENTITIES } from '../../../constants/entities'

// Types
import { LessonFilter } from '../hooks/types.d'
import { LessonDetailsToolbarType } from './types'
import { LESSON_TYPE } from '../../../types/lesson.d'
import { MEDIUM_CATEGORY, MEDIUM_TYPE } from '../../../types/medium.d'
import { UseMediaProps } from '../../media/hooks/useMedia/types.d'

export const LessonView = () => {
  const { query } = useRouter()
  const lessonId: number = +(query?.id || '0')

  const filters: Partial<LessonFilter> = { id: lessonId }
  const { lessonList } = useLessons(filters)

  if (!lessonList || !lessonList[0]) return null
  const lesson = lessonList[0]

  const lessonDetailsToolbarProps: Partial<LessonDetailsToolbarType> = {
    id: lessonId,
    title: lesson.title,
    description: lesson.description,
    type: lesson.type,
    status: lesson.status
  }

  const videoFilter: UseMediaProps = {
    entity: ENTITIES.Lesson,
    entityId: lessonId,
    category: MEDIUM_CATEGORY.Lesson,
    type: MEDIUM_TYPE.Video
  }

  const documentFilter: UseMediaProps = {
    entity: ENTITIES.Lesson,
    entityId: lessonId,
    category: MEDIUM_CATEGORY.Lesson,
    type: MEDIUM_TYPE.Document
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
            <>
              {lesson.type === LESSON_TYPE.Video && (
                <>
                  <LessonVideo filters={videoFilter} />
                  <Space />
                </>
              )}
              {(lesson.type === LESSON_TYPE.Pdf || lesson.type === LESSON_TYPE.PowerPoint) && (
                <>
                  <LessonDocument filters={documentFilter} lessonType={lesson.type} />
                  <Space />
                </>
              )}
              {lesson.type === LESSON_TYPE.Quiz && (
                <>
                  <LessonQuiz lessonId={lesson.id} />
                  <Space />
                </>
              )}
              <LessonContent lessonId={lessonId} />
            </>
          </Column>
        </Row>
      </Column>
    </Row>
  )
}
