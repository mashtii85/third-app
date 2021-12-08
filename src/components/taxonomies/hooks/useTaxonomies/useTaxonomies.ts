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
import { TaxonomiesData, UseTaxonomiesVariable, UseTaxonomiesOutput } from './types'

export const useTaxonomies = (filter: UseTaxonomiesVariable): UseTaxonomiesOutput => {
  const variables = prepareTaxonomyArguments(filter)
  const [getTaxonomies, { loading, error, data, refetch }] = useLazyQuery<
    TaxonomiesData,
    UseTaxonomiesVariable
  >(GET_TAXONOMIES, {
    variables
  })

  useEffect(() => {
    getTaxonomies({ variables })
    return (): void => {
      getTaxonomies({ variables })
    }
  }, [filter.parentId || filter.entity])

  return { error, loading, refetch, taxonomies: data?.taxonomies ?? [] }
}
