/**
 * Components - Accounts - Settings - Theme - Brand
 */

// React
import { MouseEvent } from 'react'

// UI
import { Button, Details2, DetailsText, useConfig, useOffCanvas } from '@drykiss/industry-ui'

import { BrandForm } from './form'

// Types
import { Account } from '../../../../../types/account'

export const Brand = ({ account }: { account: Account }) => {
  const offCanvas = useOffCanvas()
  const { config } = useConfig()

  const handleSuccess = () => {
    offCanvas.close()
  }

  const handleBrandSettings = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    offCanvas.show({
      content: <BrandForm account={account} handleSuccess={handleSuccess} />,
      title: 'Brand'
    })
  }

  const BrandToolbar = () => (
    <Button content="Edit" context="white" onClick={handleBrandSettings} size="sm" />
  )

  return (
    <Details2 fitParentHeight open title="Brand" toolbar={<BrandToolbar />}>
      <DetailsText content="Name" text={config.Brand?.name} />
    </Details2>
  )
}
