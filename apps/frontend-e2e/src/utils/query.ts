import { ENTITY_QUERY } from '../constants/queries'

export const prepareQueryName = (queryName: ENTITY_QUERY): string => {
  return `@gql${queryName}Query`
}
