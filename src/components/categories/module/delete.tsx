/**
 * Components - Category - Module - Delete
 */

// hooks
import { useDeleteTaxonomy } from '../hooks/useDelete'
// UI
import { Text } from '@drykiss/industry-ui'
import { AddButton } from '../../common/buttons/addButton'
// types
import { TaxonomyDeleteProps } from './types'
export const TaxonomyDelete = ({ taxonomyId, onSuccess }: TaxonomyDeleteProps) => {
  const { loading, deleteTaxonomy } = useDeleteTaxonomy({
    category: 'course-categories',
    taxonomyId: taxonomyId,
    onCompleted: onSuccess,
    onError: console.log
  })

  return (
    <>
      <Text>Are you sure you want to delete this?</Text>
      <AddButton content="Delete" context="danger" disabled={loading} handleClick={deleteTaxonomy}>
        <div></div>
      </AddButton>
    </>
  )
}
