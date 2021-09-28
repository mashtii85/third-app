/**
 * Components - Taxonomies - Hooks - useTaxonomies
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_TAXONOMIES } from '../queries'
import { prepareTaxonomyArguments } from './helper'
import { TaxonomiesData, UseTaxonomiesVariable, UseTaxonomiesOutput } from './types'
export const useTaxonomies = (filter: UseTaxonomiesVariable): UseTaxonomiesOutput => {
  const variables = prepareTaxonomyArguments(filter)
  const { data, error, loading } = useQuery<TaxonomiesData, UseTaxonomiesVariable>(GET_TAXONOMIES, {
    variables
  })

  if (error) {
    return { loading: false, error, taxonomies: data?.taxonomies || [] }
  }

  return { loading, taxonomies: data?.taxonomies || [] }
}
