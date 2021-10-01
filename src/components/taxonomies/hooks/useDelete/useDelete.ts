/**
 * Components - Courses - List - Table - Hooks - useCourseQuery
 */

// Apollo
import { useMutation } from '@apollo/client'
import { useTaxonomies } from '../'

// Queries
import { DELETE_TAXONOMY, GET_TAXONOMIES } from '../../queries'

// Types
import { UseDeleteTaxonomyOutput, UseDeleteTaxonomyProps } from './types'
import { Taxonomy } from '../../../../types/taxonomy'
import { prepareTaxonomyArguments } from '../helpers'
import { UseTaxonomiesVariable } from '../useTaxonomies/types'

export const useDeleteTaxonomy = (props: UseDeleteTaxonomyProps): UseDeleteTaxonomyOutput => {
  const variables = prepareTaxonomyArguments(props)
  const taxonomiesVariable: UseTaxonomiesVariable = {
    category: props.category,
    entity: props.entity,
    entityId: props.entityId,
    parentId: props.parentId
  }
  // Refresh cache
  useTaxonomies(taxonomiesVariable)

  const [deleteTaxonomy, { error, loading }] = useMutation(DELETE_TAXONOMY, {
    onCompleted: props.onCompleted,
    onError: props.onError,
    update(cache, { data }) {
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
