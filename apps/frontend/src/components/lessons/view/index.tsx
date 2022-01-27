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
  Details,
  DetailsText,
  Link,
  formatDateStandard,
  formatTime
} from '@drykiss/industry-ui'
import { LessonContent } from './components/text/view'
import { LessonVideo } from './components/video/view'
import { LessonDocument } from './components/document/view'
import { LessonQuiz } from './components/quiz/view'
import { LessonAssignment } from './components/assignment/view'

// Hooks
import { useLessons } from '../hooks/useLesson/useLessons'

// Types
import {
  LessonDetailsToolbarType,
  LessonFilter,
  LESSON_TYPE,
  MEDIUM_CATEGORY,
  MEDIUM_TYPE,
  pages,
  CurrentUser,
  UseMediaProps
} from '@availabletowork/types'

// Helpers
import { LessonDetailsToolbar } from './helpers'

// Constants
import { ENTITIES, STATUS_ACTIVE } from '@availabletowork/types'

export const LessonView = ({ user }: { user: CurrentUser }) => {
  const { query } = useRouter()
  const lessonId: number = +(query?.id || '0')

  const filters: Partial<LessonFilter> = { id: lessonId }
  const { lessonList, refetch } = useLessons(filters)

  if (!lessonList || !lessonList[0]) return null
  const lesson = lessonList[0]

  const lessonDetailsToolbarProps: Partial<LessonDetailsToolbarType> = {
    id: lessonId,
    title: lesson.title,
    description: lesson.description,
    type: lesson.type,
    status: lesson.status
  }

  const medium = lesson.media?.find(
    (mdum) =>
      mdum.filename && mdum.type === MEDIUM_TYPE.Video && mdum.status === STATUS_ACTIVE.Active
  )

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
            <Details
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
            </Details>
          </Column>
          <Column md={9}>
            <>
              {lesson.type === LESSON_TYPE.Video && (
                <>
                  <LessonVideo medium={medium} filters={videoFilter} />
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
              {lesson.type === LESSON_TYPE.Assignment ? (
                <>
                  <LessonAssignment lesson={lesson} user={user} onsuccess={refetch} />
                  <Space />
                </>
              ) : (
                <LessonContent lesson={lesson} />
              )}
            </>
          </Column>
        </Row>
      </Column>
    </Row>
  )
}
