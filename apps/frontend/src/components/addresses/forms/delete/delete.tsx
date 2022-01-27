/**
 * Components - Addresses - Form - Delete - Delete
 */

import { SIZE } from '@availabletowork/types'

// UI
import { Button, Space, Text } from '@drykiss/industry-ui'
import { useDeleteAddress } from '../../hooks/useDelete/useDelete'

// Types
import { ENTITIES, UseAddressProps } from '@availabletowork/types'

export const DeleteAddressForm = ({
  id,
  title,
  entity,
  entityId,
  type,
  onSuccess
}: {
  id: number
  title: string
  entity: ENTITIES
  entityId: number
  type?: string
  onSuccess: () => void
}) => {
  const addressProps: Partial<UseAddressProps> = { entity, entityId, type }
  const { deleteAddress } = useDeleteAddress(addressProps, {
    onCompleted: onSuccess,
    onError: (error) => {
      console.error(error)
    }
  })

  const handleDelete = () => {
    deleteAddress({ variables: { id: id } })
  }

  return (
    <>
      <Text>Are you sure to delete address '{title}'?</Text>
      <Space />
      <Button size={SIZE.SM} content="Delete" context="danger" onClick={handleDelete} />
    </>
  )
}
