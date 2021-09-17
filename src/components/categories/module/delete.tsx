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
export const TaxonomyDelete = ({ taxonomyId, type, onSuccess }: TaxonomyDeleteProps) => {
  const { loading, deleteTaxonomy } = useDeleteTaxonomy({
    category: type,
    taxonomyId: taxonomyId,
    onCompleted: onSuccess,
    onError: console.error
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
