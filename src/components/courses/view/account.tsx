/**
 * Components - Courses - View
 */

// React
import { useState, useEffect } from 'react'

// Apollo
import { useQuery, useMutation } from '@apollo/client'

import { GET_COURSE } from '../queries'
import { UPDATE_LESSON_PROGRESS_BY_PK, ADD_LESSON_PROGRESS_ONE } from '../../lessons/queries'

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

import VideoPlayer from '../../common/videoPlayer/videoPlayer'
import { parseVideos } from '../helpers'
import { Quiz } from '../../common/quiz/quiz'
import { Course } from '../../../types/course'

// Helper
import { getCurrentLesson, getCurrentLessonProgress, findNextLesson } from '../../lessons/helpers'

export const AccountCourseView = () => {
  let hasActive = false
  const pageState = {
    pageMode: COURSE_PAGE_MODE.Progress,
    actionButtonCaption: 'Complete and continue',
    canCompleteLesson: false,
    showNextLesson: false,
    completedLessonId: 0,
    selectedModuleId: 0,
    selectedLessonId: 0
  }

  const { query } = useRouter()
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [stateHolder, setStateHolder] = useState(pageState)

  const { data: { course = [] } = {}, refetch } = useQuery<Course>(GET_COURSE, {
    skip: !query?.id,
    variables: {
      courseId: parseInt(query?.id as string)
    }
  })

  const [updateLessonProgressByPk] = useMutation(UPDATE_LESSON_PROGRESS_BY_PK, {
    onCompleted: () => {
      refetch()
    }
  })

  const [addLessonProgress] = useMutation(ADD_LESSON_PROGRESS_ONE, {
    onCompleted: () => {
      refetch()
    }
  })

  useEffect(() => {
    if (
      !stateHolder.canCompleteLesson &&
      !stateHolder.showNextLesson &&
      stateHolder.completedLessonId !== 0 &&
      stateHolder.selectedLessonId !== 0 &&
      stateHolder.completedLessonId !== stateHolder.selectedLessonId
    ) {
      startLesson(
        getCurrentLesson(course, stateHolder.selectedModuleId, stateHolder.selectedLessonId)
      )
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
    const modules = course.modules || []

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
    console.log(progress)
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
          status: progress?.status,
          actions: [actionModel]
        })
      })

    return data
  }

  const prepareLessonForStarting = (lesson: Lesson) => {
    const lessonProgress = lesson?.lesson_progresses[0] || {}
    if (lessonProgress.id) {
      const lessonProgressModel = { status: LESSON_PROGRESS_STATUS.Started }
      updateLessonProgressByPk({
        variables: { id: lessonProgress.id, changes: lessonProgressModel }
      })
    } else {
      const argument = {
        client_id: lesson.client_id,
        enrollment_id: course.id,
        lesson_id: lesson.id,
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

  const startLesson = (lesson: Lesson) => {
    const lessonProgress = lesson?.lesson_progresses[0]
    if (lessonProgress) {
      stateHolder.selectedModuleId = lessonProgress.lesson.module_id
      stateHolder.selectedLessonId = lessonProgress.lesson.id
    }
    if (lessonProgress && lessonProgress.status === LESSON_PROGRESS_STATUS.Completed) {
      stateHolder.pageMode = COURSE_PAGE_MODE.View
      stateHolder.actionButtonCaption = 'Next lesson'
      stateHolder.canCompleteLesson = false
      stateHolder.showNextLesson = true
      setLesson(lesson)
    } else {
      stateHolder.pageMode = COURSE_PAGE_MODE.Progress
      if (lesson.type !== LESSON_TYPE.Quiz) {
        stateHolder.actionButtonCaption = 'Complete and continue'
        stateHolder.canCompleteLesson = true
        stateHolder.showNextLesson = false
      }
      setLesson(prepareLessonForStarting(lesson))
    }

    scrollTo('top')
  }

  const completeLesson = () => {
    const lessonProgress = getCurrentLessonProgress(
      course,
      stateHolder.selectedModuleId,
      stateHolder.selectedLessonId
    )

    if (lessonProgress?.status === LESSON_PROGRESS_STATUS.Completed) {
      stateHolder.pageMode = COURSE_PAGE_MODE.View
      const nextLesson = findNextLesson(
        course,
        stateHolder.selectedModuleId,
        stateHolder.selectedLessonId
      )
      if (nextLesson) {
        stateHolder.selectedModuleId = nextLesson.selectedModuleId
        stateHolder.selectedLessonId = nextLesson.selectedLessonId
        startLesson(
          getCurrentLesson(course, stateHolder.selectedModuleId, stateHolder.selectedLessonId)
        )
      } else {
        stateHolder.showNextLesson = false
        stateHolder.canCompleteLesson = false
        setStateHolder(stateHolder)
      }
    } else {
      stateHolder.pageMode = COURSE_PAGE_MODE.Progress
      stateHolder.canCompleteLesson = false
      stateHolder.showNextLesson = false
      stateHolder.completedLessonId = stateHolder.selectedLessonId

      const lessonProgressModel = { points: 1, status: LESSON_PROGRESS_STATUS.Completed }
      updateLessonProgressByPk({
        variables: { id: lessonProgress?.id, changes: lessonProgressModel }
      })
    }
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
        <Heading tag="h2" content={course?.title} />

        <Space />
        {course?.modules?.length &&
          course.modules.map((m: Module) => (
            <Details2 key={m.id} open title={m.title}>
              <Stepper items={prepareLessons(m)} />
            </Details2>
          ))}
      </Column>

      <Column md={8}>
        <Heading tag="h2" content={lesson ? lesson.title : 'Course overview'} />

        <Space />

        <Row>
          <Column md={8}>
            {lesson ? (
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
                {course?.media?.length && (
                  <Image alt={course?.title} src={`/${course.media[0].filename}`} />
                )}
                <DetailsText content="Author" text={course?.author ?? ''} />
                <DetailsText content="Description" text={course?.description ?? ''} />
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
