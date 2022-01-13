/**
 * Components - Dashboard - Tiles - Overview - Queries
 */

// Apollo
import { gql } from '@apollo/client'

export const GET_CLIENT_TILES_DATA = gql`
  query GetTilesData($clientId: Int!) {
    activeCourses: course_aggregate(
      where: { account_id: { _eq: $clientId }, status: { _eq: "active" } }
    ) {
      aggregate {
        count
      }
    }
    enrolledCourses: course_enrollment_aggregate(
      where: { account: { client_id: { _eq: $clientId } } }
    ) {
      aggregate {
        count
      }
    }
    completedLessons: lesson_progress_aggregate(
      where: {
        course_enrollment: {
          account: { client_id: { _eq: $clientId } }
          status: { _eq: "completed" }
        }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`
export const GET_ADMIN_TILES_DATA = gql`
  query GetAdminTilesData {
    activeClients: account_aggregate(
      where: { type: { _eq: "client" }, status: { _eq: "active" } }
    ) {
      aggregate {
        count
      }
    }
  }
`
