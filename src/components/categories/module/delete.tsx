/**
 * Components - Category - Module - Delete
 */

// Apollo
import { useMutation } from '@apollo/client'
import { DELETE_TAXONOMY } from '../queries'

// UI
import { Text } from '@drykiss/industry-ui'
import { AddButton } from '../../common/buttons/addButton'
// types
import { TaxonomyDeleteProps } from './types'
export const TaxonomyDelete = ({ taxonomyId, onSuccess }: TaxonomyDeleteProps) => {
  const [DeleteMedia, { loading }] = useMutation(DELETE_TAXONOMY, {
    variables: {
      taxonomyId
    },
    onCompleted: () => onSuccess()
  })

  return (
    <>
      <Text>Are you sure you want to delete this?</Text>
      <AddButton content="Delete" context="danger" disabled={loading} handleClick={DeleteMedia}>
        <div></div>
      </AddButton>
    </>
  )
}
