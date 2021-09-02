/**
 * Components - Courses - List
 */

// UI
import { Card, Column, Row } from '@drykiss/industry-ui'

// Types
import type { CourseListProps } from './types.d'

import path from '../../config/navigation/admin.json'

export const CourseList = (props: CourseListProps) => {
  return (
    <Row>
      {props.courses.map((c) => (
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
