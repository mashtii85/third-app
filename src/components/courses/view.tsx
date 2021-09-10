/**
 * Components - Courses - View
 */

// React
import { useState, useEffect } from 'react'

// Apollo
import { useQuery, useMutation } from '@apollo/client'

import { GET_COURSE, UPDATE_LESSON_PROGRESS_BY_PK, ADD_LESSON_PROGRESS_ONE } from './query'

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

import { CourseProgressChart } from './chart'

// Types
import { Module } from '../../types/module.d'
import { StepperActionModel, StepperModel } from '../../types/stepper.d'
import { Lesson, LESSON_TYPE } from '../../types/lesson.d'
import { LessonProgress, LESSON_PROGRESS_STATUS } from '../../types/lessonProgress.d'

import VideoPlayer from '../common/videoPlayer/videoPlayer'
import { parseVideos } from './helpers'
import { Quiz } from '../common/quiz/quiz'
import { Course } from '../../types/course'

export const CourseView = () => {
  const { query } = useRouter()
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [canCompleteLesson, setCanCompleteLesson] = useState<boolean>(false)
  const [completedLessonId, setCompletedLessonId] = useState<number>(0)

  let hasActive = false
  let selectedLessonId = 0
  let selectedModuleId = 0

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
      !canCompleteLesson &&
      completedLessonId !== 0 &&
      selectedLessonId !== 0 &&
      completedLessonId !== selectedLessonId
    ) {
      console.log('completedLessonId', completedLessonId, 'selectedLessonId', selectedLessonId)
      // console.log()
      startLesson(getCurrentLesson())
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
        const lessonProgresses: LessonProgress[] = lesson?.lesson_progresses || []
        lessonProgresses.forEach((lessonProgress: LessonProgress) => {
          progress.push({
            id: lessonProgress.id,
            label: lessonProgress.status,
            status: lessonProgress.status
          })
        })
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
        actionId++
        if (!hasActive && progress?.status !== LESSON_PROGRESS_STATUS.Completed) {
          hasActive = true
          isActive = true
          selectedModuleId = module.id
          selectedLessonId = lesson.id
        } else isActive = false

        const actionModel: StepperActionModel = {
          id: actionId,
          active:
            (isActive && !canCompleteLesson) ||
            progress?.status === LESSON_PROGRESS_STATUS.Completed,
          context: 'secondary',
          type: 'button',
          content:
            progress?.status === LESSON_PROGRESS_STATUS.Pending
              ? 'Start lesson'
              : 'Continue lesson',
          handleClick: () => startLesson(lesson)
        }

        if (progress?.status === LESSON_PROGRESS_STATUS.Completed) {
          actionModel.context = 'success'
          actionModel.content = 'View lesson'
          actionModel.handleClick = () => viewLesson()
        }

        data.push({
          id: lesson.id,
          label: lesson.title,
          date:
            progress?.status === LESSON_PROGRESS_STATUS.Completed
              ? `${formatDateStandard(progress.updated_at)} ${formatTime(progress.updated_at)}`
              : isActive && canCompleteLesson
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

  const viewLesson = () => {
    console.log('What should I do?')
  }

  const startLesson = (lesson: Lesson) => {
    setLesson(prepareLessonForStarting(lesson))
    if (lesson.type === LESSON_TYPE.Quiz) return
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    setCanCompleteLesson(true)
  }

  const getCurrentLesson = () => {
    const currentLesson =
      course?.modules
        ?.find((module: Module) => module.id === selectedModuleId)
        ?.lessons?.find((lesson: Lesson) => lesson.id === selectedLessonId) || null
    return currentLesson
  }

  const getCurrentLessonProgress = () => {
    const currentLesson = getCurrentLesson()
    return currentLesson.lesson_progresses[0]
  }

  const completeLesson = () => {
    const lessonProgresses = getCurrentLessonProgress()
    const lessonProgressModel = { points: 1, status: LESSON_PROGRESS_STATUS.Completed }
    updateLessonProgressByPk({
      variables: { id: lessonProgresses.id, changes: lessonProgressModel }
    })
    setCanCompleteLesson(false)
    setCompletedLessonId(selectedLessonId)
  }

  const onQuizComplete = () => {
    setCanCompleteLesson(true)
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
                  {canCompleteLesson && (
                    <Button
                      context="secondary"
                      content="Complete and continue"
                      data-cy="complete"
                      onClick={completeLesson}
                    />
                  )}
                </>
              </Details2>
            ) : (
              <Details2 open title="Details">
                {course?.media?.length && (
                  <Image alt={course?.title} src={course?.media[0]?.filename} />
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

export default CourseView
