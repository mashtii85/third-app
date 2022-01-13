/**
 * Components - Taxonomies - Hooks - useTaxonomies
 */

// Apollo
import { useLazyQuery } from '@apollo/client'
import { useEffect } from 'react'
import { GET_TAXONOMIES } from '../../queries'

// Helpers
import { prepareTaxonomyArguments } from '../helpers'

// Types
import { TaxonomiesData, TaxonomyFilters, UseTaxonomiesOutput } from './types'

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
