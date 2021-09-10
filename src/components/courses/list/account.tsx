/**
 * Components - Courses - List - AccountCourseList
 */

// UI
import { Card, Column, Row } from '@drykiss/industry-ui'

import pages from '../../../config/pages.json'
import { useEnrollments } from '../../enrollments/hooks'

export const AccountCourseList = ({ accountId }: { accountId: number }) => {
  const { enrollments, error, loading } = useEnrollments({ userId: accountId })

  if (loading) {
    console.log('loading')
  }
  if (error) {
    console.log('error')
  }

  return (
    <Row>
      {enrollments.map(({ course }) => (
        <Column key={course.id} md={3}>
          <Card
            alt={course.title}
            body={course.description}
            bordered={true}
            image={course.media?.[0]?.filename ? `/${course.media[0].filename}` : null}
            title={course.title}
            to={`${pages.dashboard.coursesAccount.view_by_id}${course.id}`}
          />
        </Column>
      ))}
    </Row>
  )
}
