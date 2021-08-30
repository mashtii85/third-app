/**
 * Components - Courses - List
 */

// React
import { FC } from 'react'

// UI
import { Card, Column, Row } from '@drykiss/industry-ui'

// Mocks
import { Courses } from '../../mocks/courses'

// Types
import { CourseListProps } from './types'

import path from '../../config/navigation/admin.json'

export const CourseList: FC<CourseListProps> = ({ isCompleted }) => {
  const filtredCourses = isCompleted ? Courses.filter((item) => item.progress === 100) : Courses
  return (
    <Row>
      {filtredCourses.map((c) => (
        <Column key={c.id} md={3}>
          <Card
            alt={c.title}
            body={c.description}
            bordered={true}
            image={c.media?.[0]?.filename || null}
            title={c.title}
            to={`${path.dashboard.courses.view_by_id}${c.id}`}
          />
        </Column>
      ))}
    </Row>
  )
}
