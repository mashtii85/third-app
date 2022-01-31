/**
 * Components - Courses - List - Table - Hooks - useCourseQuery
 */

// Apollo
import { useMutation } from '@apollo/client'

// Queries
import { DELETE_TAXONOMY, GET_TAXONOMIES } from '@availabletowork/queries'

// Types
import { Taxonomy, UseDeleteTaxonomyOutput, UseDeleteTaxonomyProps } from '@availabletowork/types'

// Helpers
import { prepareTaxonomyArguments } from '../helpers'

export const useDeleteTaxonomy = (props: UseDeleteTaxonomyProps): UseDeleteTaxonomyOutput => {
  const [deleteTaxonomy, { error, loading }] = useMutation(DELETE_TAXONOMY, {
    onCompleted: props.onCompleted,
    onError: props.onError,
    update(cache, { data }) {
      const variables = prepareTaxonomyArguments(props)
      const taxonomyId = data?.taxonomy?.id
      const { taxonomies } = cache.readQuery({
        query: GET_TAXONOMIES,
        variables: variables
      }) || { taxonomies: [] }
      const result = taxonomies?.filter((item: Taxonomy) => item.id !== taxonomyId)
      cache.writeQuery({
        query: GET_TAXONOMIES,
        variables,
        data: { taxonomies: result }
      })
    }
  })

  return { deleteTaxonomy, error, loading }
}
