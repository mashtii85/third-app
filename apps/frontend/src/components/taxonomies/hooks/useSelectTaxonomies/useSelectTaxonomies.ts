/**
 * Components - Taxonomies - Hooks - useTaxonomies
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_TAXONOMIES_ITEMS } from '@availabletowork/queries'

// Types
import { SelectDataList, TaxonomyFilters, UseSelectOutput } from '@availabletowork/types'

// Helpers
import { prepareTaxonomyArguments } from '../helpers'

export const useSelectTaxonomies = (filters?: TaxonomyFilters): UseSelectOutput => {
  const variables = prepareTaxonomyArguments(filters)

  const { data, error, loading } = useQuery<SelectDataList>(GET_TAXONOMIES_ITEMS, {
    variables
  })

  return { error, loading, options: data?.options ?? [] }
}
