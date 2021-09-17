/**
 * Components - Courses - List - Table - Hooks - useCourseQuery
 */

// Apollo
import { useMutation } from '@apollo/client'
import { DELETE_TAXONOMY, GET_TAXONOMIES } from '../queries'

// Types
import { UseDeleteTaxonomyOutput, UseDeleteTaxonomyProps } from './types.d'
import { Taxonomy } from '../../../types/taxonomy.d'

export const useDeleteTaxonomy = (props: UseDeleteTaxonomyProps): UseDeleteTaxonomyOutput => {
  const [deleteTaxonomy, { loading }] = useMutation(DELETE_TAXONOMY, {
    variables: { taxonomyId: props.taxonomyId },
    onCompleted: props.onCompleted,
    onError: props.onError,
    update(cache, { data }) {
      const taxonomyId = data?.delete_taxonomy_by_pk?.id
      const where = { category: props.category }

      const { taxonomies } = cache.readQuery({
        query: GET_TAXONOMIES,
        variables: {
          ...where
        }
      }) || { taxonomies: [] }
      const result = taxonomies.filter((item: Taxonomy) => item.id !== taxonomyId)
      cache.writeQuery({
        query: GET_TAXONOMIES,
        variables: { ...where },
        data: { taxonomies: result }
      })
    }
  })

  return { deleteTaxonomy, loading }
}
