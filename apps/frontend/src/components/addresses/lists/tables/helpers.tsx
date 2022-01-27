/**
 * Components - Addresses - List - Table - Helper
 */

// React
import { MouseEvent, useContext } from 'react'

// UI
import { Button, OffCanvasContext } from '@drykiss/industry-ui'

// Forms
import { AddressListForm } from '../../forms/list/list'

// Types
import { ADDRESS_TYPE, offCanvasType, UseAddressProps } from '@availabletowork/types'

export const Toolbar = ({
  addressType,
  filters,
  onCompleted
}: {
  addressType: ADDRESS_TYPE
  filters: Partial<UseAddressProps>
  onCompleted: () => void
}) => {
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)

  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    offCanvas.show({
      content: (
        <AddressListForm addressType={addressType} filters={filters} onCompleted={onCompleted} />
      ),
      submit: false,
      title: 'Edit addresses'
    })
  }

  return <Button context="white" onClick={handleClick} size="sm" content="Edit" />
}
