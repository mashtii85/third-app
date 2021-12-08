/**
 * Components - Selects - Helpers
 */
// Types
import { GetQueryTypeInput, GetQueryTypeOutput } from './types.d'
import { ENTITIES } from '../../constants/entities'
import { GET_COURSE_ITEMS, GET_EVENT_ITEMS, GET_LOCATION_ITEMS, GET_MEMBER_ITEMS } from './queries'

export const checkProps = (prevProps: any, nextProps: any): boolean => {
  const items = ['entity', 'entityId', 'locationId', 'type']
  let propsEqual = true

  const prevError = prevProps.errors[prevProps.name]?.message
  const nextError = nextProps.errors[nextProps.name]?.message

  // Check if there's a new error or the error is gone
  if (prevError !== nextError) {
    propsEqual = false
  }

  items.forEach((item) => {
    if (prevProps[item] !== nextProps[item]) {
      propsEqual = false
    }
  })

  return propsEqual
}

export const getQuery = ({ type }: GetQueryTypeInput): GetQueryTypeOutput => {
  switch (type) {
    case ENTITIES.Course:
      return {
        query: GET_COURSE_ITEMS
        // variables: {
        //   entity: '',
        //   entityId: 0
        // }
      }
    case ENTITIES.Location:
      return {
        query: GET_LOCATION_ITEMS
        // variables: {
        //   entity: '',
        //   entityId: 0
        // }
      }
    case ENTITIES.Event:
      return {
        query: GET_EVENT_ITEMS
        // variables: {
        //   entity: '',
        //   entityId: 0
        // }
      }
    case ENTITIES.Account:
      return {
        query: GET_MEMBER_ITEMS
        // variables: {
        //   entity: '',
        //   entityId: 0
        // }
      }
    default:
      return {
        query: GET_MEMBER_ITEMS
      }
  }
}
