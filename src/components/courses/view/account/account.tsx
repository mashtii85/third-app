/**
 * Components - Courses - View - Account
 */

// React
import { useEffect, useReducer, useRef } from 'react'

// Next
import { useRouter } from 'next/router'

// Hooks
import { useCourse } from '../../hooks'
import { useCreateLessonProgress, useUpdateLessonProgress } from './hooks'
import { useUpdateCourseEnrollment } from '../../../enrollments/hooks/useUpdate/useUpdate'

// UI
import {
  Breadcrumb,
  Button,
  Column,
  Details2,
  DetailsText,
  Heading,
  Image,
  Row,
  Space,
  Stepper,
  formatDateStandard,
  formatTime
} from '@drykiss/industry-ui'
import { CompletionCertificate } from './components/certificate/completionCertificate'
import { CourseProgressBar } from '../../progressBar'
import { NotesTable } from '../../notes/lists/tables/table'
import { Quiz } from '../../../common/quiz/quiz'
import styled from 'styled-components'
import ArrowRightIcon from '../../../icons/arrowRight'
import LeftArrowIcon from '../../../icons/arrowLeft'
import { CourseLessonDocument } from './components/document/view'
import { ResourcesTable } from './components/resources/resourcesTable'
import { CourseLessonVideo } from './components/video/view'
import { CourseLessonAssignment } from './components/assignment/view'

// Helpers
import { useCurrentUser } from '../../../../utils/useCurrentUser'
import { findPreviousLesson, getCurrentLesson, getLessonNumber } from '../../../lessons/helpers'
import { prepareLessons, startLesson, prepareLessonForStarting } from './handler'
import { completeLesson, fillCertificateModel, lessonSummary, preparePageState } from './helpers'
import { reducer } from './reducer'

// Constants
import { ENTITIES } from '../../../../constants/entities'

// Types
import { Module } from '../../../../types/module.d'
import { QuizCompletedData } from '../../../common/quiz/types.d'
import { LESSON_TYPE } from '../../../../types/lesson.d'
import { POST_TYPE } from '../../../../types/post.d'
import { COURSE_PAGE_MODE } from '../types.d'
import { TAXONOMY_TYPE } from '../../../../types/taxonomy.d'
import { AssignmentActionTypes } from './components/assignment/types.d'
import { CourseActionTypes } from './types.d'

export const AccountCourseView = () => {
  const { query } = useRouter()

  const completedQuizData = useRef<QuizCompletedData>({
    passed: false,
    score: 0
  })

  const courseId = parseInt(query?.id as string)
  const { course, refetch } = useCourse(courseId)

  const { updateLessonProgress } = useUpdateLessonProgress({
    onCompleted: (data) => {
      const progress = data.lessonProgress
      fillCertificateModel(
        state.pageMode,
        `${user.name_first} ${user.name_last}`,
        course?.title!,
        `${formatDateStandard(progress.updated_at)} ${formatTime(progress.updated_at)}`,
        'BVM QX4 CV6',
        onStateChanged
      )
      refetch()
    },
    onError: (error) => console.error(error.message)
  })

  const { createLessonProgress } = useCreateLessonProgress({
    onCompleted: () => {
      refetch()
    },
    onError: (error) => console.error(error.message)
  })

  const { updateCourseEnrollment } = useUpdateCourseEnrollment({
    onCompleted: () => refetch(),
    onError: (error) => console.error(error.message)
  })

  const { user } = useCurrentUser()

  const [state, dispatch] = useReducer(reducer, preparePageState)
  const {
    actionButtonCaption,
    canCompleteLesson,
    certificateModel,
    completedLessonId,
    pageMode,
    showNextLesson,
    currentLesson
  } = state

  useEffect(() => {
    if (
      !canCompleteLesson &&
      !showNextLesson &&
      completedLessonId !== 0 &&
      state.selectedLessonId !== 0 &&
      completedLessonId !== state.selectedLessonId &&
      course?.title
    ) {
      const currentLesson = getCurrentLesson(course, state.selectedModuleId, state.selectedLessonId)
      if (currentLesson) {
        dispatch({ type: 'setLesson', payload: currentLesson })
        startLesson(currentLesson, onStateChanged)
      }
    }
  }, [])

  if (!query?.id || !course) return <></>

  const onStateChanged = (action: CourseActionTypes): void => {
    switch (action.type) {
      case 'prepareLesson':
        dispatch({
          type: 'setLesson',
          payload: prepareLessonForStarting(action.payload!, onStateChanged)
        })
        break
      case 'quizFinished': {
        const { finalScore, minimumScore } = action.payload
        completedQuizData.current = { score: finalScore, passed: finalScore >= minimumScore }
        dispatch(action)
        break
      }
      case 'updateProgress':
        updateLessonProgress({ variables: action.payload })
        break
      case 'createProgress':
        createLessonProgress({ variables: action.payload })
        break
      case 'updateEnrollment':
        updateCourseEnrollment({ variables: action.payload })
        break
      default:
        dispatch(action)
        break
    }
  }

  const breadcrumbs = [
    {
      to: '/',
      title: 'Home'
    },
    {
      to: '/dashboard/courses',
      title: 'Courses'
    },
    {
      to: 'dashboard/courses/view?id=' + course?.id,
      title: course?.title
    }
  ]

  const lessonNumber = getLessonNumber(
    course,
    state.currentLesson?.module_id,
    state.currentLesson?.id
  )

  const handlePreviousClick = () => {
    const previousLesson = findPreviousLesson(
      course,
      state.currentLesson?.module_id,
      state.currentLesson?.id
    )
    if (previousLesson) {
      state.selectedModuleId = previousLesson.selectedModuleId
      state.selectedLessonId = previousLesson.selectedLessonId
      dispatch({
        type: 'selectedIds',
        payload: {
          selectedModuleId: previousLesson.selectedModuleId,
          selectedLessonId: previousLesson.selectedLessonId
        }
      })
    }
    const currentLesson = getCurrentLesson(course, state.selectedModuleId, state.selectedLessonId)
    if (currentLesson) {
      startLesson(currentLesson, onStateChanged)
    }
  }

  const quizScoreInfo = (): QuizCompletedData | undefined => {
    const meta =
      currentLesson?.lesson_progresses![currentLesson?.lesson_progresses!.length! - 1]?.meta
    if (meta?.quizScore && meta?.quizPassed) {
      return {
        score: meta.quizScore,
        passed: meta.quizPassed
      }
    }
    return undefined
  }

  const onAssignmentStateChanged = (action: AssignmentActionTypes): void => {
    if (action.type === 'upload') {
      dispatch({ type: 'canComplete', payload: true })
    } else {
      dispatch({ type: 'canComplete', payload: false })
      dispatch({ type: 'nextLesson', payload: false })
    }
  }

  const cover = course?.media
    ? `${process.env.NEXT_PUBLIC_S3_CDN_URL}/${course?.media[0].filename} `
    : null

  const { username, courseTitle, dateCompleted, certificateId } = certificateModel!
  return (
    <>
      <Row>
        <Column md={8}>
          <Heading tag="h1" content={course?.title} />
          <BreadcrumbWrapper>
            <Breadcrumb breadcrumbs={breadcrumbs} separator="\" size="sm" />
          </BreadcrumbWrapper>
        </Column>
        <Column md={4}>
          <CourseProgressBar progressBarData={lessonSummary(course)} />
        </Column>
      </Row>
      <Row>
        <Column md={3}>
          {course?.modules?.length &&
            course?.modules?.map((module: Module) => (
              <Details2 key={module.id} open title={module.title}>
                <Stepper items={prepareLessons(state, module, onStateChanged)} maxWidth="unset" />
              </Details2>
            ))}
        </Column>
        <Column md={9}>
          <Row>
            <Column md={8}>
              {pageMode === COURSE_PAGE_MODE.Finished ? (
                <Details2 open title="Completion Certificate">
                  <CompletionCertificate
                    username={username!}
                    course={courseTitle!}
                    dateCompleted={dateCompleted!}
                    certificateId={certificateId!}
                  />
                </Details2>
              ) : currentLesson ? (
                <Details2 open title={currentLesson.title}>
                  <>
                    {(currentLesson.type === LESSON_TYPE.Pdf ||
                      currentLesson.type === LESSON_TYPE.PowerPoint) &&
                      currentLesson.media &&
                      currentLesson.media[0]?.filename && (
                        <CourseLessonDocument filename={currentLesson.media[0].filename} />
                      )}
                    {currentLesson.type === LESSON_TYPE.Video && currentLesson.media && (
                      <CourseLessonVideo media={currentLesson.media} />
                    )}
                    {currentLesson.type === LESSON_TYPE.Quiz && (
                      <Quiz
                        quizScoreInfo={quizScoreInfo()}
                        questions={currentLesson?.taxonomies!.filter(
                          (taxonomy) => taxonomy.type === TAXONOMY_TYPE.LessonQuestions
                        )}
                        onQuizStateChanged={onStateChanged}
                      />
                    )}
                    {currentLesson.type === LESSON_TYPE.Assignment ? (
                      <CourseLessonAssignment
                        user={user}
                        lesson={currentLesson!}
                        onStateChanged={onAssignmentStateChanged}
                      />
                    ) : (
                      currentLesson.content && (
                        <StyledContent>{currentLesson.content}</StyledContent>
                      )
                    )}
                    <Space />
                    <ButtonsWrapper>
                      {lessonNumber !== 0 ? (
                        <StyledPrevButton
                          context="primary"
                          data-cy="complete"
                          outline
                          onClick={handlePreviousClick}
                        >
                          <LeftArrowIcon context="primary" />
                          <span>Previous Lesson</span>
                        </StyledPrevButton>
                      ) : (
                        <div />
                      )}

                      {(canCompleteLesson || showNextLesson) && (
                        <StyledNextButton
                          context="primary"
                          data-cy="complete"
                          onClick={() => completeLesson(state, course, onStateChanged)}
                        >
                          <span> {actionButtonCaption}</span>
                          <ArrowRightIcon />
                        </StyledNextButton>
                      )}
                    </ButtonsWrapper>
                  </>
                </Details2>
              ) : (
                <Details2 open title="Course overview">
                  {course?.media?.length && <Image alt={course?.title} src={cover} />}
                  {/* <DetailsText content="Author" text={(course)?.author ?? ''} /> */}
                  <DetailsText content="Description" text={course?.description ?? ''} />
                </Details2>
              )}
            </Column>
            <Column md={4}>
              <Details2 key="resources" title="Resources" open>
                <ResourcesTable key={`resources-table-${course.id}`} courseId={course.id!} />
              </Details2>
              <NotesTable
                key={`notes-table-${course.id}`}
                accountId={user.account_id}
                entity={ENTITIES.Course}
                entityId={course.id}
                type={POST_TYPE.Note}
              />
            </Column>
          </Row>
        </Column>
      </Row>
    </>
  )
}

const StyledNextButton = styled(Button)`
  div {
    display: flex;
    gap: 0.5rem;
  }
`
const StyledPrevButton = styled(Button)`
  div {
    display: flex;
    gap: 0.5rem;
  }
`
const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
const BreadcrumbWrapper = styled.div`
  ol {
    padding: 0;
    padding-top: 1rem;
  }
  a {
    color: ${({ theme }) => theme.COLOUR.primary} !important;
  }
`
const StyledContent = styled.div`
  white-space: pre-wrap;
`
