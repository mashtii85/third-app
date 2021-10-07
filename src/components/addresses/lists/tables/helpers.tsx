/**
 * Components - Addresses - List - Table - Helper
 */

// React
import { MouseEvent, useContext } from 'react'

// UI
import { Button, OffCanvasContext } from '@drykiss/industry-ui'

// Types
import { UseAddressProps } from '../../hooks/types'
import { offCanvasType } from '../../../../types/offCanvas.d'

// Forms
import { AddressListForm } from '../../forms/list/list'

export const Toolbar = ({ filters }: { filters: UseAddressProps }) => {
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)

  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    offCanvas.show({
      content: <AddressListForm filters={filters} />,
      submit: false,
      title: 'Edit addresses'
    })
  }

  return <Button context="white" onClick={handleClick} size="sm" content="Edit" />
}
