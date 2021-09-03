/**
 * Components - Course - Query
 */

// Apollo
import { gql } from '@apollo/client'

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
