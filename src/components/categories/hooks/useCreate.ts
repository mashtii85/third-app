/**
 * Components - Taxonomy - List - Table - Hooks - useTaxonomyQuery
 */

// Apollo
import { useMutation } from '@apollo/client'
import { CREATE_TAXONOMY, GET_TAXONOMIES, GET_PARENT_TAXONOMIES } from '../queries'

// Types
import { UseCreateTaxonomyOutput, UseCreateTaxonomyProps } from './types'

export const useCreateTaxonomy = (props: UseCreateTaxonomyProps): UseCreateTaxonomyOutput => {
  const { isParent, parentId } = props
  const TAXONOMIES = isParent ? GET_PARENT_TAXONOMIES : GET_TAXONOMIES

  const [createTaxonomy, { error, loading }] = useMutation(CREATE_TAXONOMY, {
    onCompleted: props.onCompleted,
    onError: props.onError,
    update(cache, { data }) {
      const [taxonomyFromResponse] = data?.insert_taxonomy?.returning
      const where = { category: props.category, parentId }

      const { taxonomies } = cache.readQuery({
        query: TAXONOMIES,
        variables: {
          ...where
        }
      }) || { taxonomies: [] }

      cache.writeQuery({
        query: TAXONOMIES,
        variables: { ...where },
        data: { taxonomies: [...taxonomies, taxonomyFromResponse] }
      })
    }
  })

  return { createTaxonomy, error, loading }
}
