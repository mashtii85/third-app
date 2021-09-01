/**
 * Components - Courses - View
 */

// React
import { useState } from 'react'

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
  Stepper
} from '@drykiss/industry-ui'

import { CourseProgressChart } from './chart'

// Types
import { Module } from '../../types/module.d'
import { StepperModel } from '../../types/stepper.d'
import { LessonDataModel } from '../../types/pieChart.d'
import { Lesson, LessonStatus } from '../../types/lesson.d'

// Mocks
import { Courses } from '../../mocks/courses'

export const CourseView = () => {
  const { query } = useRouter()
  const [showCompleteButton, setShowCompleteButton] = useState(false)

  if (!query?.id) {
    return <></>
  }

  const course = Courses.find((c) => c.id === parseInt(query.id as any))!

  if (!course) {
    return <></>
  }

  const courseDescription = course?.description

  let hasActive = false
  let selectedModuleId = 0
  let selectedLessonId = 0

  const lessonSummary = () => {
    const data: LessonDataModel[] = []
    const modules = course.modules || []

    modules.forEach((module) => {
      const lessons = module.lessons || []
      lessons.forEach((lesson) => {
        data.push({
          id: lesson.id,
          label: lesson.title,
          status: lesson.status
        })
      })
    })
    return data
  }

  const prepareLessons = (m: Module) => {
    const data: StepperModel[] = []

    let actionId = 0
    let lessonStatus = false
    m?.lessons?.length &&
      m.lessons.forEach((lesson: Lesson) => {
        actionId++
        if (!hasActive && lesson.status !== LessonStatus.completed) {
          hasActive = true
          lessonStatus = true
          selectedModuleId = m.id
          selectedLessonId = lesson.id
        } else lessonStatus = false
        data.push({
          id: lesson.id,
          label: lesson.title,
          date: lesson.status === LessonStatus.completed ? '23 Aug 2021 11:45' : null,
          status: lesson.status,
          actions: [
            {
              id: actionId,
              active: lessonStatus,
              content: 'Start lesson',
              context: 'secondary',
              handleClick: () => startLesson(lesson.content),
              type: 'button'
            }
          ]
        })
      })

    return data
  }

  const startLesson = (lessonContent: string) => {
    course.description = lessonContent
    setShowCompleteButton(true)
  }

  const simulatingDatabaseChanges = (status: LessonStatus) => {
    const currentLesson = course?.modules
      ?.find((module) => module.id === selectedModuleId)
      ?.lessons?.find((lesson) => lesson.id === selectedLessonId)!
    currentLesson.status = status
  }

  const completeLesson = () => {
    simulatingDatabaseChanges(LessonStatus.completed)
    course.description = courseDescription
    setShowCompleteButton(false)
  }

  return (
    <Row>
      <Column md={4}>
        <Heading tag="h2" content={course?.title} />

        <Space />
        {course?.modules?.length &&
          course.modules.map((m) => (
            <Details2 key={m.id} open title={m.title}>
              <Stepper items={prepareLessons(m)} />
            </Details2>
          ))}
      </Column>

      <Column md={8}>
        <Heading tag="h2" content="Course overview" />

        <Space />

        <Row>
          <Column md={8}>
            <Details2 open title="Details">
              {course?.media?.length && (
                <Image alt={course?.title} src={course?.media[0]?.filename} />
              )}
              <DetailsText content="Author" text={course?.author ?? ''} />
              <DetailsText content="Description" text={course?.description ?? ''} />
              <Space />
              {showCompleteButton && (
                <Button
                  context="secondary"
                  content="Complete"
                  data-cy="complete"
                  onClick={completeLesson}
                />
              )}
            </Details2>
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
