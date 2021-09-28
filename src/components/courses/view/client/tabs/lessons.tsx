/**
 * Components - Lessons - View - Client - Tabs - Details
 */

// UI
import { Details2, Space, Row, Column } from '@drykiss/industry-ui'

// Types
import { Module } from '../../../../../types/module'

// Hooks
import { useCourse } from '../../../hooks'

import { LessonTable } from '../../../../lessons/lists/table/table'

// Helpers
import { Toolbar } from '../../../../lessons/lists/table/helpers'

export const ClientLessons = ({ courseId }: { courseId: number }) => {
  const { course, loading, error } = useCourse(courseId)
  if (error) {
    console.error(error.message)
  }
  if (loading) {
    console.log('loading')
  }
  return (
    <Row>
      <Column md="5">
        {course?.modules?.length &&
          course?.modules?.map((module: Module) => (
            <>
              <Space />
              <Details2
                open
                key={module.id}
                title={module.title}
                toolbar={<Toolbar courseId={courseId} moduleId={module?.id} />}
              >
                <LessonTable courseId={course.id} moduleId={module.id} />
              </Details2>
            </>
          ))}
      </Column>
      <Column md="7"></Column>
    </Row>
  )
}
