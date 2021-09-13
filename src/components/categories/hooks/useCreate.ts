/**
 * Components - Taxonomy - List - Table - Hooks - useTaxonomyQuery
 */

// Apollo
import { useMutation } from '@apollo/client'
import { CREATE_TAXONOMY, GET_TAXONOMIES } from '../queries'
import { UseCreateTaxonomyProps } from './types'
export const useCreateTaxonomy = (props: UseCreateTaxonomyProps) => {
  const [createTaxonomy, { loading }] = useMutation(CREATE_TAXONOMY, {
    onCompleted: props.onCompleted,
    onError: props.onError,
    update(cache, { data }) {
      const [taxonomyFromResponse] = data?.insert_taxonomy?.returning
      const where = { category: props.category }

      const { taxonomies } = cache.readQuery({
        query: GET_TAXONOMIES,
        variables: {
          ...where
        }
      }) || { taxonomies: [] }

      cache.writeQuery({
        query: GET_TAXONOMIES,
        variables: { ...where },
        data: { taxonomies: [...taxonomies, taxonomyFromResponse] }
      })
    }
  })

  return { createTaxonomy, loading }
}
