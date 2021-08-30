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
  ProgressBar,
  Row,
  Space,
  Stepper
} from '@drykiss/industry-ui'
import { CourseLessonPieChart } from './chart'

// Types
import { Module } from '../../types/module'

// Mocks
import { Courses } from '../../mocks/courses'

export const CourseView = () => {
  const { query } = useRouter()

  // if (!query?.id) {
  //   return null
  // }

  const course = Courses.find(c => c.id === parseInt(query.id as any))!

  // if (!course) {
  //   return null
  // }

  const lessonSummary = () => {
    const data: any = [];
    (course.modules || []).forEach(module => {
      (module.lessons || []).forEach(lesson => {
        data.push({
          id: lesson.id,
          label: lesson.title,
          status: lesson.status
        })
      })
    })
    return data;
  }

  // if (!course) {
  //   return null
  // }

  const [showCompleteButton, setShowCompleteButton] = useState(false);
  const courseDescription = course?.description;

  let hasActive = false, selectedModuleId = 0, selectedLessonId = 0;
  const prepareLessons = (m: Module) => {
    const data: any = []

    let actionId = 0, lessonStatus = false;
    m?.lessons?.length && m.lessons.forEach(lesson => {
      actionId++;
      if (!hasActive && lesson.status != 'completed') {
        hasActive = true;
        lessonStatus = true;
        selectedModuleId = m.id;
        selectedLessonId = lesson.id;
      }
      else
        lessonStatus = false;
      data.push({
        id: lesson.id,
        label: lesson.title,
        date: lesson.id === 1 ? '23 Aug 2021 11:45' : null,
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
    course.description = lessonContent;
    setShowCompleteButton(true);
  }

  const simulatingDatabaseChanges = (status: 'pending' | 'started' | 'completed') => {
    let currentLesson = course?.modules?.find(module => module.id == selectedModuleId)?.lessons?.find(lesson => lesson.id == selectedLessonId)!;
    currentLesson.status = status;
  }

  const completeLesson = () => {
    simulatingDatabaseChanges('completed');
    course.description = courseDescription;
    setShowCompleteButton(false);
  }

  return (
    <Row>
      <Column md={4}>
        <Heading tag='h2' content={course?.title} />

        <Space />
        {course?.modules?.length && course.modules.map(m => (
          <Details2 key={m.id} open title={m.title}>
            <Stepper items={prepareLessons(m)} />
          </Details2>
        ))}
      </Column>

      <Column md={8}>
        <Heading tag='h2' content="Course overview" />

        <Space />

        <Row>
          <Column md={8}>
            <Details2 open title='Details'>
              {course?.media?.length && <Image alt={course?.title} src={course?.media[0]?.filename} />}
              <DetailsText content="Author" text={course?.author ?? ''} />
              <DetailsText content="Description" text={course?.description ?? ''} />
              <Space />
              {showCompleteButton && <Button context="secondary" content="Complete" data-cy="complete" onClick={completeLesson} />}
            </Details2>
          </Column>

          <Column md={4}>
            <Details2 open title='Progress'>
              <CourseLessonPieChart pieData={lessonSummary()} />
            </Details2>

          </Column>
        </Row>

      </Column>
    </Row>
  )
}

export default CourseView
