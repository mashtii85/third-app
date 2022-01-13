/**
 * Components - Accounts - Settings - Theme - Logo
 */

// React
import { MouseEvent } from 'react'

// UI
import { Button, Details, Image, Space, useConfig, useOffCanvas } from '@drykiss/industry-ui'
import { MediaForm } from '../../../../media/forms/create/form'

// Types
import { Account } from '../../../../../types/account'
import { MEDIUM_CATEGORY, MEDIUM_TYPE, DropzoneProps } from '../../../../../types/medium.d'
import { STATUS_ACTIVE } from '../../../../../types/select.d'
import { MediaFormType } from '../../../../media/forms/create/types.d'
import { MediaFilter } from '../../../../media/hooks/useMedia/types.d'
import { ENTITIES } from '../../../../../constants/entities'

export const ThemeLogo = ({ account }: { account: Account | undefined }) => {
  const offCanvas = useOffCanvas()
  const { config, setConfig } = useConfig()

  const handleThemeLogoSettings = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    const handleSuccess = (data: any) => {
      const filename = data?.media?.returning?.[0]?.filename

      if (filename) {
        const updatedBrand = { ...config.Brand }
        updatedBrand.logo = filename
        updatedBrand.logoCDN = true

        setConfig({ ...config, Brand: updatedBrand })
      }

      offCanvas.close()
    }

    const defaultValues: Partial<MediaFormType> = {
      entity: ENTITIES.Account,
      entityId: account?.id || 0,
      category: MEDIUM_CATEGORY.Logo,
      status: STATUS_ACTIVE.Active,
      type: MEDIUM_TYPE.Image
    }

    const dropzoneProps: DropzoneProps = {
      accept: 'image/*',
      disabled: false,
      multiple: false
    }
    const filters: Partial<MediaFilter> = {
      entity: defaultValues.entity,
      entityId: defaultValues.entityId,
      category: defaultValues.category,
      type: defaultValues.type
    }

    offCanvas.show({
      title: 'Theme Logo',
      submit: false,
      content: (
        <MediaForm
          filters={filters}
          dropzoneProps={dropzoneProps}
          defaultValues={defaultValues}
          onSuccess={handleSuccess}
        />
      )
    })
  }

  const ThemeLogoToolbar = () => (
    <Button content="Edit" context="white" onClick={handleThemeLogoSettings} size="sm" />
  )

  return (
    <Details open title="Theme Logo" toolbar={<ThemeLogoToolbar />}>
      {config.Brand.logoCDN && config.Brand.logo ? (
        <Image
          alt="Theme logo"
          src={`${process.env.NEXT_PUBLIC_S3_CDN_URL}/${config.Brand.logo}`}
          width={100}
        />
      ) : (
        <Space />
      )}
    </Details>
  )
}
