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
export const TaxonomyDelete = ({
  taxonomyId,
  type,
  entity,
  entityId,
  onSuccess
}: TaxonomyDeleteProps) => {
  const taxonomiesVariable = {
    category: type,
    entity,
    entityId,
    onCompleted: onSuccess,
    onError: console.error
  }
  const { loading, deleteTaxonomy } = useDeleteTaxonomy(taxonomiesVariable)

  const handleDelete = async () => {
    return await deleteTaxonomy({ variables: { taxonomyId: taxonomyId } })
  }
  return (
    <>
      <Text>Are you sure you want to delete this?</Text>
      <AddButton content="Delete" context="danger" disabled={loading} handleClick={handleDelete}>
        <></>
      </AddButton>
    </>
  )
}
