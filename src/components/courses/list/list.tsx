/**
 * Components - Courses - List
 */

// React
import { FC } from 'react'

// UI
import { Card, Column, Row } from '@drykiss/industry-ui'

// Types
import type { CourseListProps } from '../types.d'

import path from '../../../config/navigation/admin.json'

export const CourseList: FC<CourseListProps> = ({ courses }) => {
  return (
    <Row>
      {courses.map((course) => (
        <Column key={course.id} md={3}>
          <Card
            alt={course.title}
            body={course.description}
            bordered={true}
            image={course.media?.[0]?.filename || null}
            title={course.title}
            to={`${path.dashboard.courses.view_by_id}${course.id}`}
          />
        </Column>
      ))}
    </Row>
  )
}
