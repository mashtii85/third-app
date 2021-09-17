/**
 * Components - Courses - List - AccountCourseList
 */

// UI
import { Card, Column, Row } from '@drykiss/industry-ui'

import pages from '../../../config/pages'
import { useEnrollments } from '../../enrollments/hooks'

export const AccountCourseList = ({ accountId }: { accountId: number }) => {
  const { enrollments, error, loading } = useEnrollments({ filters: { accountId } })

  if (loading) {
    console.log('loading')
  }

  if (error) {
    console.error(error.message)
  }

  return (
    <Row>
      {enrollments.map((item) => (
        <Column key={item.id} md={3}>
          <Card
            alt={item.course.title}
            body={item.course.description}
            bordered={true}
            image={item.course.media?.[0]?.filename ? `/${item.course.media[0].filename}` : null}
            title={item.course.title}
            to={`${pages.dashboard.coursesAccount.view_by_id}${item.course.id}`}
          />
        </Column>
      ))}
    </Row>
  )
}
