/**
 *  Components - Selects - Queries - Queries
 */

// Apollo
import { gql } from '@apollo/client'

export const GET_LOCATION_ITEMS = gql`
  query getLocations {
    options: location {
      value: id
      label: name
    }
  }
`

export const GET_EVENT_ITEMS = gql`
  query getEvents {
    options: event {
      value: id
      label: tile
    }
  }
`

export const GET_COURSE_ITEMS = gql`
  query getCourses {
    options: course {
      value: id
      label: title
    }
  }
`

export const GET_MEMBER_ITEMS = gql`
  query getAccount {
    options: account {
      value: id
      label: name
    }
  }
`
export const GET_TAXONOMIES_ITEMS = gql`
  query GetTaxonomy($where: taxonomy_bool_exp) {
    options: taxonomy(where: $where) {
      value: id
      label: name
    }
  }
`
