/**
 * Components - Taxonomy - List - Table - Hooks - useTaxonomyQuery
 */

// Apollo
import { useMutation } from '@apollo/client'
import { CREATE_TAXONOMY, GET_TAXONOMIES } from '../queries'
import { prepareTaxonomyArguments } from './helper'

// Types
import { UseCreateTaxonomyOutput, UseCreateTaxonomyProps } from './types'

export const useCreateTaxonomy = (props: UseCreateTaxonomyProps): UseCreateTaxonomyOutput => {
  const variables = prepareTaxonomyArguments(props)
  const [createTaxonomy, { error, loading }] = useMutation(CREATE_TAXONOMY, {
    onCompleted: props.onCompleted,
    onError: props.onError,
    update(cache, { data }) {
      const [taxonomyFromResponse] = data?.insert_taxonomy?.returning
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
