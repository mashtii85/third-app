/**
 * Components - Dashboard - Tiles - Query
 */

// Apollo
import { gql } from '@apollo/client'

export const GET_TILES_DATA = gql`
  query GetTilesData($accountId: Int!) {
    activeCourses: course_aggregate(
      where: { client_id: { _eq: $accountId }, status: { _eq: "active" } }
    ) {
      aggregate {
        count
      }
    }
    enrolledCourses: course_enrollment_aggregate(where: { client_id: { _eq: $accountId } }) {
      aggregate {
        count
      }
    }
    completedLessons: lesson_progress_aggregate(
      where: { client_id: { _eq: $accountId }, status: { _eq: "completed" } }
    ) {
      aggregate {
        count
      }
    }
  }
`
