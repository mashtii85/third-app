/**
 * Components - Taxonomies - Hooks - useTaxonomies
 */

// Apollo
import { useQuery } from '@apollo/client'

// Types
import { SelectDataList, TaxonomyFilters, UseSelectOutput } from '@availabletowork/types'
import { GET_TAXONOMIES_ITEMS } from '../../../selects/queries'

// Helpers
import { prepareTaxonomyArguments } from '../helpers'

export const useSelectTaxonomies = (filters?: TaxonomyFilters): UseSelectOutput => {
  const variables = prepareTaxonomyArguments(filters)

  const { data, error, loading } = useQuery<SelectDataList>(GET_TAXONOMIES_ITEMS, {
    variables
  })

  return { error, loading, options: data?.options ?? [] }
}
