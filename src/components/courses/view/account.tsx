/**
 * Components - Courses - View
 */

// React
import { useState, useEffect } from 'react'

// Styled components
import { CompletionCertificate } from './completionCertificate'

// Apollo
import { useQuery, useMutation } from '@apollo/client'

import { GET_COURSE } from '../queries'
import {
  UPDATE_LESSON_PROGRESS_BY_PK,
  ADD_LESSON_PROGRESS_ONE
} from '../../lessons/queries/queries'
import { UPDATE_COURSE_ENROLLMENT_BY_PK } from '../../enrollments/queries/queries'

// Next
import { useRouter } from 'next/router'

// UI
import {
  Button,
  Column,
  Details2,
  DetailsText,
  Heading,
  Image,
  Row,
  Space,
  Stepper,
  formatTime,
  formatDateStandard
} from '@drykiss/industry-ui'

import { CourseProgressChart } from '../chart'

// Types
import { Module } from '../../../types/module'
import { StepperActionModel, StepperModel } from '../../../types/stepper'
import { Lesson, LESSON_TYPE } from '../../../types/lesson.d'
import { LessonProgress, LESSON_PROGRESS_STATUS } from '../../../types/lessonProgress.d'
import { COURSE_PAGE_MODE } from './types.d'
import { COURSE_ENROLLMENT_STATUS } from '../../../types/courseEnrollment.d'

import VideoPlayer from '../../common/videoPlayer/videoPlayer'
import { parseVideos } from '../helpers'
import { Quiz } from '../../common/quiz/quiz'
import { CourseData } from '../hooks/types'
import { Course } from '../../../types/course'

// Helper
import { getCurrentLesson, getCurrentLessonProgress, findNextLesson } from '../../lessons/helpers'

// User
import { useCurrentUser } from '../../../utils/useCurrentUser'

export const AccountCourseView = () => {
  let hasActive = false
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

  const { query } = useRouter()
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [stateHolder, setStateHolder] = useState(pageState)

  const { data: { course } = { course: {} }, refetch } = useQuery<CourseData>(GET_COURSE, {
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
      stateHolder.completedLessonId !== stateHolder.selectedLessonId
    ) {
      const currentLesson = getCurrentLesson(
        course as Course,
        stateHolder.selectedModuleId,
        stateHolder.selectedLessonId
      )
      startLesson(currentLesson)
    }
  })

  if (!query?.id) {
    return <></>
  }

  if (!course) {
    return <></>
  }

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
            status: LESSON_PROGRESS_STATUS.Pending
          }
          progress.push(lessonProgressModel)
        }
      })
    })
    return progress
  }

  const prepareLessons = (module: Module) => {
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
          context: 'secondary',
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
          date:
            progress?.status === LESSON_PROGRESS_STATUS.Completed
              ? `${formatDateStandard(progress.updated_at)} ${formatTime(progress.updated_at)}`
              : isActive && stateHolder.canCompleteLesson
              ? 'In progress ...'
              : null,
          status: progress.status,
          actions: [actionModel]
        })
      })

    return data
  }

  const prepareLessonForStarting = (lesson?: Lesson) => {
    const lessonProgress = lesson?.lesson_progresses[0] || {}
    if (lessonProgress.id) {
      const lessonProgressModel = { status: LESSON_PROGRESS_STATUS.Started }
      updateLessonProgressByPk({
        variables: { id: lessonProgress.id, changes: lessonProgressModel }
      })
    } else {
      const argument = {
        client_id: lesson?.client_id,
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

  const scrollTo = (elementId: string = '') => {
    switch (elementId.toLowerCase()) {
      case '':
      case 'top':
      default:
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
    }
  }

  const startLesson = (lesson?: Lesson) => {
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
      stateHolder.selectedModuleId = nextLesson?.selectedModuleId ?? 0
      stateHolder.selectedLessonId = nextLesson?.selectedLessonId ?? 0
      startLesson(
        getCurrentLesson(
          course as Course,
          stateHolder.selectedModuleId,
          stateHolder.selectedLessonId
        )
      )
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
        const lessonProgressModel = { points: 1, status: LESSON_PROGRESS_STATUS.Completed }
        updateLessonProgressByPk({
          variables: { id: lessonProgress?.id, changes: lessonProgressModel }
        })
        if (stateHolder.pageMode === COURSE_PAGE_MODE.Finished) {
          const courseEnrollmentModel = { status: COURSE_ENROLLMENT_STATUS.Completed }
          updateCourseEnrollmentByPk({
            variables: {
              id: ((course as Course)?.course_enrollments ?? [])[0].id,
              changes: courseEnrollmentModel
            }
          })
        }
      }
    }
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

  const onQuizComplete = () => {
    stateHolder.actionButtonCaption = 'Complete and continue'
    stateHolder.canCompleteLesson = true
    stateHolder.showNextLesson = false
    setStateHolder(stateHolder)
  }

  return (
    <Row>
      <Column md={4}>
        <Heading tag="h2" content={(course as Course)?.title} />

        <Space />
        {(course as Course)?.modules?.length &&
          (course as Course)?.modules?.map((m: Module) => (
            <Details2 key={m.id} open title={m.title}>
              <Stepper items={prepareLessons(m)} />
            </Details2>
          ))}
      </Column>

      <Column md={8}>
        {stateHolder.pageMode === COURSE_PAGE_MODE.Finished ? (
          <Heading tag="h2" content="Completion Certificate" />
        ) : (
          <Heading tag="h2" content={lesson ? lesson.title : 'Course overview'} />
        )}
        <Space />

        <Row>
          <Column md={8}>
            {stateHolder.pageMode === COURSE_PAGE_MODE.Finished ? (
              <Details2 open title="Congratulation, You have been promoted!">
                <CompletionCertificate
                  username={stateHolder.certificateModel.username}
                  course={stateHolder.certificateModel.course}
                  dateCompleted={stateHolder.certificateModel.dateCompleted}
                  certificateId={stateHolder.certificateModel.certificateId}
                />
              </Details2>
            ) : lesson ? (
              <Details2 open title="Lesson">
                <>
                  {lesson.type === LESSON_TYPE.Video && lesson.media && (
                    <VideoPlayer videos={parseVideos(lesson.media)} />
                  )}
                  {lesson.type === LESSON_TYPE.Quiz && (
                    <Quiz questions={lesson.questions} onComplete={onQuizComplete} />
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
              <Details2 open title="Details">
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

          <Column md={4}>
            <Details2 open title="Progress">
              <CourseProgressChart pieData={lessonSummary()} />
            </Details2>
          </Column>
        </Row>
      </Column>
    </Row>
  )
}
