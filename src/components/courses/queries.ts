/**
 *  Components - Tasks - Query
 */

// Apollo
import { gql } from '@apollo/client'

export const GET_ENROLLMENTS = gql`
  query GetEntrolledCourses($userId: Int!) {
    enrollments: course_enrollment(where: { account_id: { _eq: $userId } }) {
      course {
        id
        title
        description
        media(limit: 1) {
          filename
        }
      }
    }
  }
`

export const GET_COURSES = gql`
  query GetCourses($limit: Int = 20, $order_by: [course_order_by!] = {}, $where: course_bool_exp) {
    courses: course(where: $where, limit: $limit, order_by: $order_by) {
      id
      title
      description
      customFields: custom_fields
      enrolled: course_enrollments_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`

export const GET_COURSE = gql`
  query GetCourse($courseId: Int!) {
    course: course_by_pk(id: $courseId) {
      id
      account_id
      description
      title
      status
      updated_at
      created_at
      modules {
        id
        description
        created_at
        ordering
        status
        title
        updated_at
        course_id
        lessons {
          id
          description
          created_at
          content
          title
          type
          status
          ordering
          module_id
          lesson_progresses {
            status
          }
        }
      }
    }
  }
`
