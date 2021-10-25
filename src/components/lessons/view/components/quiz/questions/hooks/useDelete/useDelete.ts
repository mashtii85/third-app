/**
 * Components - Lesson - View - Components - Quiz - Questions - Hooks - useDelete
 */

// Apollo
import { useMutation } from '@apollo/client'

// Queries
import { DELETE_TAXONOMIES, GET_TAXONOMIES } from '../../../../../../../taxonomies/queries/queries'

// Helpers
import { prepareTaxonomyArguments } from '../../../../../../../taxonomies/hooks/helpers'

// Types
import { UseDeleteAnswerOutput, UseDeleteAnswerProps } from './types.d'
import { Taxonomy } from '../../../../../../../../types/taxonomy.d'

export const useDeleteAnswers = (props: Partial<UseDeleteAnswerProps>): UseDeleteAnswerOutput => {
  const [deleteAnswer, { error, loading }] = useMutation(DELETE_TAXONOMIES, {
    onCompleted: props.onCompleted,
    onError: props.onError,
    update(cache, { data }) {
      const variables = prepareTaxonomyArguments(props)
      const taxonomyId = data?.taxonomy?.id
      const { taxonomies } = cache.readQuery({
        query: GET_TAXONOMIES,
        variables
      }) || { taxonomies: [] }
      const result = taxonomies?.filter((item: Taxonomy) => item.id !== taxonomyId)
      cache.writeQuery({
        query: GET_TAXONOMIES,
        variables,
        data: { taxonomies: result }
      })
    }
  })

  return { deleteAnswer, error, loading }
}
