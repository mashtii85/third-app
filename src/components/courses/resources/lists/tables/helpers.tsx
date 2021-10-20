/**
 * Components - Courses - Resources - List - Table - Helper
 */

// React
import { MouseEvent, useContext } from 'react'

// UI
import { Button, ButtonToolbar, OffCanvasContext } from '@drykiss/industry-ui'

// Forms
import { ResourcesForm } from '../../forms/upsert/form'
import { offCanvasType } from '../../../../../types/offCanvas'

// Constants
import { THEME_CONTEXT } from '../../../../../constants/themeContext'

// Types
import { POST_TYPE } from '../../../../../types/post.d'
import { STATUS_ACTIVE } from '../../../../../types/select.d'
import { PostFilter } from '../../../../posts/hooks/usePost/types.d'

export const getIconByFilename = (filename: string): string => {
  const ext = filename.split('.').pop()
  switch (ext) {
    case 'pdf':
    case '.pdf':
      return 'pdf icon'
    case 'ppt':
    case '.ppt':
    case 'pptx':
    case '.pptx':
      return 'ppt icon'
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
      return 'image icon'
  }
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
            accountId: filters.accountId!,
            entityId: filters.entityId!,
            entity: filters.entity!,
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
