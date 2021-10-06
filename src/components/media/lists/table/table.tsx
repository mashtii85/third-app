/**
 * Components - Lessons - Media - Lists - Table
 */

// React
import { useContext, MouseEvent } from 'react'

// Apollo
import { useMedia } from '../../hooks/get/useMedia'

// UI
import { OffCanvasContext, Table, TableActions } from '@drykiss/industry-ui'
import { AddButton } from '../../../common/buttons/addButton'
import { MediaForm } from '../../forms/create/form'
import { MediaDeleteForm } from '../../forms/delete/delete'

// Types
import { offCanvasType } from '../../../../types/offCanvas'
import { MediaTableProps } from './types.d'
import { Medium, DropzoneProps, MEDIUM_CATEGORY, MEDIUM_TYPE } from '../../../../types/medium.d'
import { STATUS_ACTIVE } from '../../../../types/select.d'
import { UseMediaProps } from '../../hooks/get/types.d'
import { MediaFormType } from '../../forms/create/types.d'

// Constants
import { THEME_CONTEXT } from '../../../../constants/themeContext'

export const MediaTable = ({ mediaTableProps }: { mediaTableProps: MediaTableProps }) => {
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)

  const mediaProps: UseMediaProps = {
    entity: mediaTableProps.entity,
    entityId: mediaTableProps.entityId
  }
  const { loading, mediaList } = useMedia(mediaProps)
  const handleSuccess = () => {
    offCanvas.close()
  }

  const handleClick = (_: MouseEvent, row?: Medium): void => {
    console.log(row)
    const defaultValues: MediaFormType = {
      entity: mediaTableProps.entity,
      entityId: mediaTableProps.entityId,
      category: MEDIUM_CATEGORY.Lesson,
      status: STATUS_ACTIVE.Active,
      type: MEDIUM_TYPE.Image
    }
    const dropzoneProps: DropzoneProps = {
      accept: 'image/*,video/*',
      disabled: false,
      multiple: true
    }

    offCanvas.show({
      title: 'Add',
      content: (
        <MediaForm
          dropzoneProps={dropzoneProps}
          defaultValues={defaultValues}
          onSuccess={offCanvas.close}
        />
      )
    })
  }

  const handleDelete = (_: MouseEvent, row?: Medium): void => {
    offCanvas.show({
      content: (
        <MediaDeleteForm
          id={row?.id!}
          entity={mediaTableProps.entity}
          entityId={mediaTableProps.entityId}
          caption={row?.caption}
          onSuccess={handleSuccess}
        />
      ),
      title: 'Delete Media',
      submit: false
    })
  }

  const actionsData = () => {
    const buttons = [
      {
        context: THEME_CONTEXT.danger,
        icon: ['fas', 'trash'],
        onClick: (_: MouseEvent, row: Medium) => handleDelete(_, row),
        tooltip: 'Delete'
      }
    ]
    return buttons
  }

  const columns = [
    { text: 'id', hidden: true },
    { text: 'entity', hidden: true },
    { text: 'entityId', hidden: true },
    { text: 'Caption' },
    { text: 'Type', hidden: true },
    { text: 'Status', hidden: true },
    {
      formatter: TableActions,
      formatterData: actionsData,
      text: 'Actions'
    }
  ]

  const rows = () =>
    mediaList.map((item: Medium) => {
      return {
        id: item.id,
        entity: item.entity,
        entityId: item.entity_id,
        caption: item.caption,
        type: item.type,
        status: item.status,
        actions: ''
      }
    })

  return (
    <>
      <Table fullHeight align columns={columns} loading={loading} rows={rows()} />
      <AddButton content="Add New" disabled={loading} handleClick={handleClick} />
    </>
  )
}
