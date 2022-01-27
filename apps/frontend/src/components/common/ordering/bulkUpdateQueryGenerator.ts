/**
 * Components - Common - Ordering
 */

// Constants
import { ENTITIES } from '@availabletowork/types'

// Types
import { bulkUpdateQueryGeneratorType, Sortable } from '@availabletowork/types'

export const bulkUpdateQueryGenerator = <T extends Sortable>(
  entity: ENTITIES,
  list?: T[]
): bulkUpdateQueryGeneratorType => {
  const head: string[] = []
  const sections: string[] = []
  const variables: any = {}

  list?.forEach((item, index) => {
    head.push(`$id${index}: Int!, $ordering${index}: Int!`)
    sections.push(`
      ${entity}${index}: update_${entity}(
        where: {id: {_eq: $id${index}}}, _set: {ordering: $ordering${index}}) {
        returning {
          id
          ordering
        }
      }`)
    variables[`id${index}`] = item.id
    variables[`ordering${index}`] = item.ordering
  })
  const query = `mutation BulkUpdate(${head.join(',')}) {${sections.join(',')}}`
  return { variables, query }
}
