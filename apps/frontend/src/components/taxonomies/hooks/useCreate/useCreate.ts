/**
 * Components - Taxonomy - Hooks - useTaxonomyQuery
 */

// Apollo
import { useMutation } from '@apollo/client'
import { CREATE_TAXONOMY, GET_TAXONOMIES } from '../../queries'
import { prepareTaxonomyArguments } from '../helpers'

// Types
import { UseCreateTaxonomyOutput, UseCreateTaxonomyProps } from './types'

export const useCreateTaxonomy = (props: UseCreateTaxonomyProps): UseCreateTaxonomyOutput => {
  const [createTaxonomy, { error, loading }] = useMutation(CREATE_TAXONOMY, {
    onCompleted: props.onCompleted,
    onError: props.onError,
    update(cache, { data }) {
      if (props.isParent) {
        delete props.clientId
      }
      const variables = prepareTaxonomyArguments(props)

      const [taxonomyFromResponse] = data?.taxonomies.returning ?? []
      const { taxonomies } = cache.readQuery({
        query: GET_TAXONOMIES,
        variables
      }) || { taxonomies: [] }

      const result = [...taxonomies, taxonomyFromResponse]
      cache.writeQuery({
        query: GET_TAXONOMIES,
        variables,
        data: { taxonomies: result }
      })
    }
  })

  return { createTaxonomy, error, loading }
}
