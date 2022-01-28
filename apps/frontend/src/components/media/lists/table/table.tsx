/**
 * Components - Lessons - Media - Lists - Table
 */

// React
import { useContext, MouseEvent } from 'react'

// Apollo
import { useMedia } from '../../hooks/useMedia/useMedia'

// UI
import { OffCanvasContext, Table, TableActions } from '@drykiss/industry-ui'
import { AddButton } from '../../../common/buttons/addButton'
import { MediaForm } from '../../forms/create/form'
import { MediaDeleteForm } from '../../forms/delete/delete'

// Types
import {
  MediaFormType,
  MediaFilter,
  MediaTableProps,
  UseMediaProps,
  offCanvasType,
  Medium,
  DropzoneProps
} from '@availabletowork/types'

// Constants
import {
  ENTITIES,
  MEDIUM_CATEGORY,
  MEDIUM_TYPE,
  STATUS_ACTIVE,
  THEME_CONTEXT
} from '@availabletowork/constants'

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
    const defaultValues: Partial<MediaFormType> = {
      entity: mediaTableProps.entity,
      entityId: mediaTableProps.entityId,
      category: mediaTableProps.category,
      status: STATUS_ACTIVE.Active,
      type: mediaTableProps.type
    }
    const dropzoneProps: DropzoneProps = {
      accept: mediaTableProps.acceptTypes,
      disabled: false,
      multiple: true
    }
    const filters: Partial<MediaFilter> = {
      entity: defaultValues.entity,
      entityId: defaultValues.entityId
    }

    offCanvas.show({
      title: 'Add',
      submit: false,
      content: (
        <MediaForm
          filters={filters}
          dropzoneProps={dropzoneProps}
          defaultValues={defaultValues}
          onSuccess={offCanvas.close}
        />
      )
    })
  }

  const handleFileUpload = (_: MouseEvent, row: Medium) => {
    const mediaTableProps: MediaTableProps = {
      entity: ENTITIES.Medium,
      entityId: row.id as number,
      category: MEDIUM_CATEGORY.Lesson, // Do we need new medium cat?
      status: STATUS_ACTIVE.Active,
      type: MEDIUM_TYPE.Document, // Do we need new medium type?
      acceptTypes: '.srt,.vtt',
      buttonCaption: 'New subtitle'
    }
    offCanvas.show({
      content: <MediaTable mediaTableProps={mediaTableProps} />,
      submit: false,
      title: 'Subtitle' // Maybe any files types!
    })
  }

  const handleDelete = (_: MouseEvent, row?: Medium): void => {
    offCanvas.show({
      content: (
        <MediaDeleteForm
          id={row?.id}
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

  const actionFormatter = ({ row }: { row: Medium }) =>
    TableActions({
      row: row,
      data: [
        {
          context: THEME_CONTEXT.dark,
          icon: ['fas', 'file-upload'],
          onClick: (_: MouseEvent, row: Medium) => handleFileUpload(_, row),
          tooltip: 'Subtitles',
          disabled: row.type !== MEDIUM_TYPE.Video
        },
        {
          context: THEME_CONTEXT.danger,
          icon: ['fas', 'trash'],
          onClick: (_: MouseEvent, row: Medium) => handleDelete(_, row),
          tooltip: 'Delete'
        }
      ]
    })

  const columns = [
    { text: 'id', hidden: true },
    { text: 'entity', hidden: true },
    { text: 'entityId', hidden: true },
    { text: 'Caption' },
    { text: 'Type', hidden: true },
    { text: 'Status', hidden: true },
    {
      formatter: actionFormatter,
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
      <AddButton
        content={mediaTableProps.buttonCaption}
        disabled={loading}
        handleClick={handleClick}
      />
    </>
  )
}
