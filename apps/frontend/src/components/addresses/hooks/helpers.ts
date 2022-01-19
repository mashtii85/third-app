/**
 * Components - Addresses - Hooks - helpers
 */

// Types
import { GQLClause, GraphqlWhere } from '../../../types/gql.d'
import { Address } from '../../../types/address.d'
import { AddressFilter } from './types.d'

export const prepareArguments = ({
  filters
}: {
  filters: Partial<AddressFilter>
}): GQLClause<Address> => {
  const where: GraphqlWhere<Address> = {}

  if (filters.entity) {
    where.entity = { _eq: filters.entity }
  }

  if (filters.entityId) {
    where.entity_id = { _eq: filters.entityId }
  }

  if (filters.type) {
    where.meta = { _contains: prepareMetaClause(filters.type) }
  }

  if (filters.default) {
    where.meta = { _contains: prepareMetaClause(filters.default) }
  }

  if (filters?.name) {
    where.name = { _ilike: filters.name }
  }

  if (filters.line) {
    where._or = [
      { line1: { _ilike: `%${filters.line}%` } },
      { line2: { _ilike: `%${filters.line}%` } },
      { line3: { _ilike: `%${filters.line}%` } }
    ]
  }

  if (filters.city) {
    where.city = { _ilike: filters.city }
  }

  if (filters.postcode) {
    where.postcode = { _ilike: filters.postcode }
  }

  if (filters.county) {
    where.county = { _ilike: filters.county }
  }

  if (filters.status) {
    where.status = { _eq: filters.status }
  }
  const otherClause = {
    limit: filters?.limit ?? null,
    offset: filters?.offset ?? null,
    order_by: filters?.orderBy ?? {}
  }
  const clause = { ...otherClause, where }
  return clause
}

export const prepareMetaClause = (commaSeparated?: string, value = true): string | undefined => {
  if (!commaSeparated) return null
  const keys: string[] = commaSeparated.split(',')
  const metaProps: string[] = []
  keys.forEach((key) => {
    metaProps.push(`"${key}": ${value}`)
  })
  const metaClause = JSON.parse(`{${metaProps.join(',')}}`)
  return metaClause
}
