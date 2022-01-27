/**
 * Components - Taxonomy - Hooks - useTaxonomyQuery
 */

// Apollo
import { useMutation } from '@apollo/client'
import { UPDATE_TAXONOMY } from '../../queries'

// Types
import { UseUpdateTaxonomyOutput, UseUpdateTaxonomyProps } from '@availabletowork/types'

export const useUpdateTaxonomy = (props: UseUpdateTaxonomyProps): UseUpdateTaxonomyOutput => {
  const [updateTaxonomy, { error, loading }] = useMutation(UPDATE_TAXONOMY, {
    onCompleted: props.onCompleted,
    onError: props.onError
  })

  return { updateTaxonomy, error, loading }
}
