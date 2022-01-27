/**
 * Components - Courses - Resources - List - Table - Helper
 */

// React
import { MouseEvent, useContext } from 'react'

// UI
import { Button, ButtonToolbar, OffCanvasContext, Path } from '@drykiss/industry-ui'

// Forms
import { ResourcesForm } from '../../forms/upsert/form'

// Helpers
import { CustomIcon } from '../../../../common/icons/icons'

// Constants
import { ICONS_PATHS } from '../../../../../constants/iconPaths'

// Types & Constants
import {
  offCanvasType,
  PostFilter,
  POST_TYPE,
  STATUS_ACTIVE,
  THEME_CONTEXT
} from '@availabletowork/types'

export const getIconByFilename = (filename: string): string => {
  const ext = Path.extname(filename)
  switch (ext) {
    case 'pdf':
    case '.pdf':
      return 'pdf'
    case 'ppt':
    case '.ppt':
    case 'pptx':
    case '.pptx':
      return 'ppt'
    case '.jpg':
    case 'jpg':
    case '.jpeg':
    case 'jpeg':
    case '.png':
    case 'png':
    case '.bmp':
    case 'bmp':
    case '.gif':
    case 'gif':
    default:
      return 'image'
  }
}

export const Icon = ({
  iconname = 'img',
  size = 80,
  color = '#999'
}: {
  iconname: string
  size?: number
  color?: string
}) => {
  let path = ''
  switch (iconname.toLowerCase()) {
    case 'lnk':
    case 'link':
      path = ICONS_PATHS.Link
      break
    case 'nolnk':
    case 'nolink':
      path = ICONS_PATHS.NoLink
      break
    case 'img':
    case 'image':
      path = ICONS_PATHS.Image
      break
    case 'pdf':
      path = ICONS_PATHS.Pdf
      break
    case 'ppt':
    case 'pptx':
      path = ICONS_PATHS.Ppt
      break
    case 'nofile':
      path = ICONS_PATHS.NoFile
      break
    case 'noattachment':
    default:
      path = ICONS_PATHS.NoAttachment
      break
  }
  return <CustomIcon path={path} size={size} color={color} />
}

export const Toolbar = (filters: Partial<PostFilter>) => {
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)

  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    offCanvas.show({
      content: (
        <ResourcesForm
          onSuccess={offCanvas.close}
          defaultValues={{
            id: undefined,
            accountId: filters.accountId,
            entityId: filters.entityId,
            entity: filters.entity,
            title: '',
            type: POST_TYPE.Resource,
            content: undefined,
            status: STATUS_ACTIVE.Active
          }}
        />
      ),
      submit: true,
      title: 'Create a resource'
    })
  }

  return (
    <ButtonToolbar>
      <Button context={THEME_CONTEXT.secondary} onClick={handleClick} size="sm" content="Add new" />
    </ButtonToolbar>
  )
}
