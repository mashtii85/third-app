import {
  CREATE_LOCATION,
  DELETE_LOCATION,
  GET_LOCATIONS,
  UPDATE_LOCATION
} from '../../src/components/locations/queries'
import {
  createLocationVariables,
  deleteLocationVariable,
  location,
  locations,
  updateLocationVariables
} from '../../__mocks__/locations/locations'

export const prepareMocks = [
  {
    request: {
      query: GET_LOCATIONS,
      variables: {
        order_by: {},
        limit: 20,
        offset: 0,
        where: {
          account_id: {
            _eq: 2
          }
        }
      }
    },

    result: { data: { locations } }
  },
  {
    request: {
      query: CREATE_LOCATION,
      variables: createLocationVariables
    },
    result: {
      data: {
        location
      }
    }
  },

  {
    request: {
      query: UPDATE_LOCATION,
      variables: updateLocationVariables
    },
    result: {
      data: {
        location
      }
    }
  },
  {
    request: {
      query: DELETE_LOCATION,
      variables: deleteLocationVariable
    },
    result: {
      data: {
        location
      }
    }
  }
]
