/**
 * Components - Taxonomies - Hooks - useTaxonomies
 */

// Apollo
import { useQuery } from '@apollo/client'

// Types
import { SelectDataList, UseSelectOutput } from '../../../../types/select.d'
import { GET_TAXONOMIES_ITEMS } from '../../../selects/queries'

// Helpers
import { prepareTaxonomyArguments } from '../helpers'
import { TaxonomyFilters } from '../useTaxonomies/types'

export const useSelectTaxonomies = (filters?: TaxonomyFilters): UseSelectOutput => {
  const variables = prepareTaxonomyArguments(filters)

  const { data, error, loading } = useQuery<SelectDataList>(GET_TAXONOMIES_ITEMS, {
    variables
  })
  // const taxonomies = data?.taxonomies??[]
  // const options = taxonomies?.map((item) => ({ value: item.id, text: item.name }))

  return { error, loading, options: data?.options ?? [] }
}
