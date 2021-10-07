/**
 * Components - Courses - View
 */

// React
import { useEffect, useRef, useState } from 'react'

// Next
import { useRouter } from 'next/router'

// Apollo
import { useMutation, useQuery } from '@apollo/client'

// GQL
import {
  ADD_LESSON_PROGRESS_ONE,
  UPDATE_LESSON_PROGRESS_BY_PK
} from '../../lessons/queries/queries'
import { GET_COURSE } from '../queries'
import { UPDATE_COURSE_ENROLLMENT_BY_PK } from '../../enrollments/queries/queries'

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
  Stepper,
  formatDateStandard,
  formatTime
} from '@drykiss/industry-ui'
import { StepperActionModel, StepperModel } from '../../../types/stepper'
import VideoPlayer from '../../common/videoPlayer/videoPlayer'
import { CompletionCertificate } from './completionCertificate'
import { Course } from '../../../types/course'
import { CourseData } from '../hooks/types'
import { CourseProgressBar } from '../progressBar'

// Constants
import { THEME_CONTEXT } from '../../../constants/themeContext'

// Types
import {
  LESSON_PROGRESS_STATUS,
  LessonProgress,
  LessonProgressUpdateModel
} from '../../../types/lessonProgress.d'
import { Module } from '../../../types/module'
import { Quiz } from '../../common/quiz/quiz'
import { QuizCompletedData } from '../../common/quiz/types'
import { LESSON_TYPE, Lesson, QuizQuestion } from '../../../types/lesson.d'

// Helpers
import { parseVideos } from '../helpers'
import { useCurrentUser } from '../../../utils/useCurrentUser'
import { findNextLesson, getCurrentLesson, getCurrentLessonProgress } from '../../lessons/helpers'
import { scrollTo } from '../../../utils/scrollTo'

import { COURSE_ENROLLMENT_STATUS } from '../../../types/courseEnrollment.d'
import { COURSE_PAGE_MODE } from './types.d'

export const AccountCourseView = () => {
  let hasActive = false

  const { query } = useRouter()

  const [lesson, setLesson] = useState<Lesson | null>(null)
  const pageState = {
    pageMode: COURSE_PAGE_MODE.Progress,
    actionButtonCaption: 'Complete and continue',
    canCompleteLesson: false,
    showNextLesson: false,
    completedLessonId: 0,
    selectedModuleId: 0,
    selectedLessonId: 0,
    certificateModel: {
      username: '',
      course: '',
      dateCompleted: '',
      certificateId: ''
    }
  }
  const [stateHolder, setStateHolder] = useState(pageState)

  const completedQuizData = useRef<QuizCompletedData>({
    passed: false,
    score: 0
  })

  const { data, refetch } = useQuery<CourseData>(GET_COURSE, {
    skip: !query?.id,
    variables: {
      courseId: parseInt(query?.id as string)
    }
  })

  const [updateLessonProgressByPk] = useMutation(UPDATE_LESSON_PROGRESS_BY_PK, {
    onCompleted: (data) => {
      const progress = data.update_lesson_progress_by_pk
      fillCertificateModel(
        `${formatDateStandard(progress.updated_at)} ${formatTime(progress.updated_at)}`
      )
      refetch()
    }
  })

  const [addLessonProgress] = useMutation(ADD_LESSON_PROGRESS_ONE, {
    onCompleted: () => {
      refetch()
    }
  })

  const [updateCourseEnrollmentByPk] = useMutation(UPDATE_COURSE_ENROLLMENT_BY_PK, {
    onCompleted: () => {
      refetch()
    }
  })

  const { user } = useCurrentUser()

  useEffect(() => {
    if (
      !stateHolder.canCompleteLesson &&
      !stateHolder.showNextLesson &&
      stateHolder.completedLessonId !== 0 &&
      stateHolder.selectedLessonId !== 0 &&
      stateHolder.completedLessonId !== stateHolder.selectedLessonId &&
      data?.course.title
    ) {
      const currentLesson = getCurrentLesson(
        data.course,
        stateHolder.selectedModuleId,
        stateHolder.selectedLessonId
      )
      if (currentLesson) {
        startLesson(currentLesson)
      }
    }
  }, [])

  if (!query?.id) {
    return <></>
  }

  if (!data?.course) {
    return <></>
  }
  const { course } = data
  const lessonSummary = () => {
    const progress: LessonProgress[] = []
    const modules = (course as Course).modules || []

    modules.forEach((module: Module) => {
      const lessons: Lesson[] = module.lessons || []
      lessons.forEach((lesson: Lesson) => {
        const lessonProgress: LessonProgress = lesson?.lesson_progresses[0]
        if (lessonProgress) {
          progress.push(lessonProgress)
        } else {
          const lessonProgressModel: LessonProgress = {
            label: LESSON_PROGRESS_STATUS.Pending,
            status: LESSON_PROGRESS_STATUS.Pending,
            id: 0,
            updated_at: new Date()
          }
          progress.push(lessonProgressModel)
        }
      })
    })
    return progress
  }

  const prepareLessons = (module: Module): StepperModel[] => {
    const data: StepperModel[] = []

    let actionId = 0
    let isActive = false
    module?.lessons?.length &&
      module.lessons.forEach((lesson: Lesson) => {
        const progress = lesson.lesson_progresses[0]
        if (!hasActive && progress?.status !== LESSON_PROGRESS_STATUS.Completed) {
          hasActive = true
          isActive = true
          if (stateHolder.pageMode === COURSE_PAGE_MODE.Progress) {
            stateHolder.selectedModuleId = module.id
            stateHolder.selectedLessonId = lesson.id
          }
        } else isActive = false

        actionId++

        const actionModel: StepperActionModel = {
          id: actionId,
          active:
            (isActive && !stateHolder.canCompleteLesson) ||
            progress?.status === LESSON_PROGRESS_STATUS.Completed,
          context: THEME_CONTEXT.secondary,
          type: 'button',
          content:
            progress?.status === undefined || progress?.status === LESSON_PROGRESS_STATUS.Pending
              ? 'Start lesson'
              : 'Continue lesson',
          handleClick: () => startLesson(lesson)
        }

        if (progress?.status === LESSON_PROGRESS_STATUS.Completed) {
          actionModel.context = 'success'
          actionModel.content = 'View lesson'
        }

        data.push({
          id: lesson.id,
          label: lesson.title,
          labelIcon:
            lesson.type === LESSON_TYPE.Quiz || lesson.type === LESSON_TYPE.Video
              ? lesson.type
              : undefined,
          date:
            progress?.status === LESSON_PROGRESS_STATUS.Completed
              ? `${formatDateStandard(progress.updated_at)} ${formatTime(progress.updated_at)}`
              : isActive && stateHolder.canCompleteLesson
                ? 'In progress ...'
                : null,
          status: progress?.status,
          actions: [actionModel]
        })
      })

    return data
  }

  const prepareLessonForStarting = (lesson?: Lesson) => {
    const lessonProgress = lesson?.lesson_progresses[0] ?? null
    if (lessonProgress) {
      const lessonProgressModel = { status: LESSON_PROGRESS_STATUS.Started }
      updateLessonProgressByPk({
        variables: { id: lessonProgress.id, changes: lessonProgressModel }
      })
    } else {
      const argument = {
        enrollment_id: (course as Course).id,
        lesson_id: lesson?.id,
        status: LESSON_PROGRESS_STATUS.Started
      }
      addLessonProgress({
        variables: argument
      })
    }
    return lesson
  }

  const startLesson = (lesson: Lesson) => {
    const lessonProgress = lesson?.lesson_progresses[0]
    if (lessonProgress) {
      stateHolder.selectedModuleId = lessonProgress?.lesson?.module?.id ?? 0
      stateHolder.selectedLessonId = lessonProgress?.lesson?.id ?? 0
    }

    if (lessonProgress && lessonProgress.status === LESSON_PROGRESS_STATUS.Completed) {
      stateHolder.pageMode = COURSE_PAGE_MODE.View
      stateHolder.actionButtonCaption = 'Next lesson'
      stateHolder.canCompleteLesson = false
      stateHolder.showNextLesson = true

      setLesson(lesson)
    } else {
      stateHolder.pageMode = COURSE_PAGE_MODE.Progress
      if (lesson?.type !== LESSON_TYPE.Quiz) {
        stateHolder.actionButtonCaption = 'Complete and continue'
        stateHolder.canCompleteLesson = true
        stateHolder.showNextLesson = false
      }
      setLesson(prepareLessonForStarting(lesson) ?? null)
    }

    scrollTo('top')
  }

  const completeLesson = () => {
    const lessonProgress = getCurrentLessonProgress(
      course as Course,
      stateHolder.selectedModuleId,
      stateHolder.selectedLessonId
    )
    const nextLesson = findNextLesson(
      course as Course,
      stateHolder.selectedModuleId,
      stateHolder.selectedLessonId
    )
    if (!nextLesson) stateHolder.pageMode = COURSE_PAGE_MODE.Finished

    if (
      lessonProgress?.status === LESSON_PROGRESS_STATUS.Completed &&
      stateHolder.pageMode !== COURSE_PAGE_MODE.Finished
    ) {
      stateHolder.pageMode = COURSE_PAGE_MODE.View
      if (nextLesson) {
        stateHolder.selectedModuleId = nextLesson.selectedModuleId
        stateHolder.selectedLessonId = nextLesson.selectedLessonId
      }
      const currentLesson = getCurrentLesson(
        course,
        stateHolder.selectedModuleId,
        stateHolder.selectedLessonId
      )
      if (currentLesson) {
        startLesson(currentLesson)
      }
    } else {
      if (stateHolder.pageMode !== COURSE_PAGE_MODE.Finished)
        stateHolder.pageMode = COURSE_PAGE_MODE.Progress
      stateHolder.canCompleteLesson = false
      stateHolder.showNextLesson = false
      stateHolder.completedLessonId = stateHolder.selectedLessonId

      if (lessonProgress?.status === LESSON_PROGRESS_STATUS.Completed) {
        fillCertificateModel(
          `${formatDateStandard(lessonProgress.updated_at)} ${formatTime(
            lessonProgress.updated_at
          )}`
        )
      } else {
        let lessonProgressModel: LessonProgressUpdateModel = {
          points: 1,
          status: LESSON_PROGRESS_STATUS.Completed
        }
        if (lesson?.type === LESSON_TYPE.Quiz) {
          lessonProgressModel = {
            ...lessonProgressModel,
            meta: {
              ...lessonProgress?.meta,
              quizScore: completedQuizData.current.score,
              quizPassed: completedQuizData.current.passed
            },
            status: completedQuizData.current.passed
              ? LESSON_PROGRESS_STATUS.Completed
              : LESSON_PROGRESS_STATUS.Started
          }
        }
        updateLessonProgressByPk({
          variables: { id: lessonProgress?.id, changes: lessonProgressModel }
        })

        if (stateHolder.pageMode === COURSE_PAGE_MODE.Finished) {
          const courseEnrollmentModel = { status: COURSE_ENROLLMENT_STATUS.Completed }

          if (course?.course_enrollments) {
            updateCourseEnrollmentByPk({
              variables: { id: course?.course_enrollments[0]?.id, changes: courseEnrollmentModel }
            })
          }
        }
        if (lesson?.type === LESSON_TYPE.Quiz) {
          completedQuizData.current = {
            score: 0,
            passed: false
          }
        }
      }
    }
    if (nextLesson) {
      const tmp = getCurrentLesson(course, nextLesson.selectedModuleId, nextLesson.selectedLessonId)
      tmp && startLesson(tmp)
    }
  }

  const onQuizComplete = (data: QuizCompletedData) => {
    completedQuizData.current = data
    completeLesson()
  }

  const fillCertificateModel = (completedAt: string) => {
    if (stateHolder.pageMode !== COURSE_PAGE_MODE.Finished) return
    loadPageState()
    pageState.certificateModel = {
      username: `${user.name_first} ${user.name_last}`,
      course: (course as Course).title,
      dateCompleted: completedAt,
      certificateId: 'BVM QX4 CV6'
    }
    setStateHolder(pageState)
  }

  const loadPageState = () => {
    pageState.actionButtonCaption = stateHolder.actionButtonCaption
    pageState.canCompleteLesson = stateHolder.canCompleteLesson
    pageState.certificateModel = stateHolder.certificateModel
    pageState.completedLessonId = stateHolder.completedLessonId
    pageState.pageMode = stateHolder.pageMode
    pageState.selectedLessonId = stateHolder.selectedLessonId
    pageState.selectedModuleId = stateHolder.selectedModuleId
    pageState.showNextLesson = stateHolder.showNextLesson
  }

  const prepareLessonQuestions = (questions: any): QuizQuestion[] => {
    return questions.map((q: any): QuizQuestion => {
      return {
        questionText: q.name,
        answers: q.meta?.answers,
        correctAnswers: q.meta?.correctAnswers,
        type: q.meta.type
      }
    })
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

  return (
    <>
      <Row>
        <Column md="8">
          <Heading tag="h1" content={(course as Course)?.title} />
          <Breadcrumb breadcrumbs={breadcrumbs} separator="\" size="sm" />
        </Column>
        <Column md="4">
          <CourseProgressBar progressBarData={lessonSummary()} />
        </Column>
      </Row>
      <Row>
        <Column md={3}>
          {(course as Course)?.modules?.length &&
            (course as Course)?.modules?.map((m: Module) => (
              <Details2 key={m.id} open title={m.title}>
                <Stepper items={prepareLessons(m)} />
              </Details2>
            ))}
        </Column>

        <Column md={9}>
          <Row>
            <Column md={9}>
              {stateHolder.pageMode === COURSE_PAGE_MODE.Finished ? (
                <Details2 open title="Completion Certificate">
                  <CompletionCertificate
                    username={stateHolder.certificateModel.username}
                    course={stateHolder.certificateModel.course}
                    dateCompleted={stateHolder.certificateModel.dateCompleted}
                    certificateId={stateHolder.certificateModel.certificateId}
                  />
                </Details2>
              ) : lesson ? (
                <Details2 open title={lesson.title}>
                  <>
                    {lesson.type === LESSON_TYPE.Video && lesson.media && (
                      <VideoPlayer videos={parseVideos(lesson.media)} />
                    )}
                    {lesson.type === LESSON_TYPE.Quiz && (
                      <Quiz
                        questions={prepareLessonQuestions(lesson.questions)}
                        onComplete={onQuizComplete}
                      />
                    )}
                    {lesson.content && <p>{lesson.content}</p>}
                    {(stateHolder.canCompleteLesson || stateHolder.showNextLesson) && (
                      <Button
                        context="secondary"
                        content={stateHolder.actionButtonCaption}
                        data-cy="complete"
                        onClick={completeLesson}
                      />
                    )}
                  </>
                </Details2>
              ) : (
                <Details2 open title="Course overview">
                  {(course as Course)?.media?.length && (
                    <Image
                      alt={(course as Course)?.title}
                      src={`/${((course as Course)?.media ?? [])[0].filename}`}
                    />
                  )}
                  {/* <DetailsText content="Author" text={(course as Course)?.author ?? ''} /> */}
                  <DetailsText content="Description" text={(course as Course)?.description ?? ''} />
                </Details2>
              )}
            </Column>

            <Column md={3}>
              <Details2 title="Resources">Resources</Details2>
              <Details2 title="Notes">Notes</Details2>
            </Column>
          </Row>
        </Column>
      </Row>
    </>
  )
}
