/**
 * Components - Dashboard - Tiles - Query
 */

// Apollo
import { gql } from '@apollo/client'

export const GET_TILES_DATA = gql`
  query GetTilesData($accountId: Int!) {
    activeCourses: course_aggregate(
      where: { account_id: { _eq: $accountId }, status: { _eq: "active" } }
    ) {
      aggregate {
        count
      }
    }
    enrolledCourses: course_enrollment_aggregate(
      where: { course: { account_id: { _eq: $accountId } } }
    ) {
      aggregate {
        count
      }
    }
  }
`
