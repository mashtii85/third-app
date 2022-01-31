/**
 * Components - Taxonomies - Hooks - useTaxonomies
 */

// React
import { useEffect } from 'react'

// Apollo
import { useLazyQuery } from '@apollo/client'
import { GET_TAXONOMIES } from '@availabletowork/queries'

// Helpers
import { prepareTaxonomyArguments } from '../helpers'

// Types
import { TaxonomiesData, TaxonomyFilters, UseTaxonomiesOutput } from '@availabletowork/types'

export const useTaxonomies = (filter: TaxonomyFilters): UseTaxonomiesOutput => {
  const variables = prepareTaxonomyArguments(filter)
  const [getTaxonomies, { loading, error, data, refetch }] = useLazyQuery<TaxonomiesData>(
    GET_TAXONOMIES,
    {
      variables
    }
  )

  useEffect(() => {
    getTaxonomies({ variables })
    return (): void => {
      getTaxonomies({ variables })
    }
  }, [filter.parentId, filter.entity])

  return { error, loading, refetch, taxonomies: data?.taxonomies ?? [] }
}
