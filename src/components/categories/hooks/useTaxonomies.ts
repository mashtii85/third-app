/**
 * Components - Taxonomies - Hooks - useTaxonomies
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_TAXONOMIES, GET_PARENT_TAXONOMIES } from '../queries'
import { TaxonomiesData, UseTaxonomiesVariable, UseTaxonomiesOutput } from './types'
export const useTaxonomies = ({
  category,
  parentId,
  isParent
}: UseTaxonomiesVariable): UseTaxonomiesOutput => {
  const TAXONOMIES = isParent ? GET_PARENT_TAXONOMIES : GET_TAXONOMIES
  const { data, error, loading } = useQuery<TaxonomiesData, UseTaxonomiesVariable>(TAXONOMIES, {
    variables: { category, parentId, isParent }
  })

  if (error) {
    return { loading: false, error, taxonomies: data?.taxonomies || [] }
  }

  return { loading, taxonomies: data?.taxonomies || [] }
}
