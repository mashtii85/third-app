/**
 * Components - Courses - List - AccountCourseList
 */
// Next
import { useRouter } from 'next/router'

// Styled Components
import styled from 'styled-components'

// UI
import { Button, Card, CardBody, Column, Row, Space } from '@drykiss/industry-ui'

import pages from '../../../config/pages'
import { useCourseEnrollment } from '../../courses/hooks/useCourseEnrollment/useCourseEnrollment'
import { useCreateEnrollment } from '../../enrollments/hooks/useCreate/useCreate'
import { useCurrentUser } from '../../../utils/useCurrentUser'
import { Course } from '../../../types/course'

export const AccountCourseList = ({ show }: { show: string }) => {
  const { user } = useCurrentUser()
  const { query, push } = useRouter()

  const view = query.show || show

  const handleSuccess = (data: any) => {
    const courseId = data?.insert_course_enrollment_one?.course_id
    push(`${pages.dashboard.coursesAccount.view_by_id}${courseId}`)
  }

  const { createEnrollment } = useCreateEnrollment({
    userId: user.client_id,
    onCompleted: handleSuccess,
    onError: (error) => {
      console.error(error)
    }
  })

  let courses: Course[] = []

  const { loading = false, courseList = [] }: any = useCourseEnrollment(user.client_id, user.id)

  if (view === 'catalog') {
    courses = courseList.filter((item: any) => !item?.course_enrollments?.length)
  } else if (view === 'enrolled') {
    courses = courseList.filter((item: any) => item?.course_enrollments?.length > 0)
  } else {
    courses = courseList
  }

  if (loading) {
    console.log('loading')
  }

  const handleEnrollCourse = (item: Course) => {
    const object = {
      account_id: item.account_id,
      course_id: item.id,
      status: 'active',
      user_id: user.id
    }
    createEnrollment({ variables: { object } })
  }

  const StyledCardBody = styled(CardBody)``

  return (
    <Row>
      {courses.map((item: any) => (
        <Column key={item.id} md={3}>
          <Card
            alt={item.title}
            bordered={true}
            image={
              item.media?.[0]?.filename
                ? `${process.env.NEXT_PUBLIC_S3_CDN_URL}/${item.media[0].filename} `
                : null
            }
            title={item.title}
            to={
              item.course_enrollments.length
                ? `${pages.dashboard.coursesAccount.view_by_id}${item.id}`
                : null
            }
          >
            <StyledCardBody>
              <Row>
                <Column md={12}>
                  <p>{item.description}</p>
                </Column>
              </Row>
              {view === 'catalog' && (
                <Row justify={'end'}>
                  <Space marginRight="sm">
                    <Button onClick={() => handleEnrollCourse(item)}>Enroll</Button>
                  </Space>
                </Row>
              )}
            </StyledCardBody>
          </Card>
        </Column>
      ))}
    </Row>
  )
}
