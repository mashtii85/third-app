/**
 * Components - Courses - List
 */

// UI
import { Card, Column, Row } from '@drykiss/industry-ui'

// Mocks
import { Courses } from '../../mocks/courses'

export const CourseList = () => {
  return (
    <Row>
      {
        Courses.map(c => <Column key={c.id} md={3}>
          <Card
            alt={c.title}
            body={c.description}
            bordered={true}
            image={c.media?.[0]?.filename || null}
            title={c.title}
            to={`/dashboard/courses/view?id=${c.id}`}
          />
        </Column>)
      }
    </Row>
  )
}
