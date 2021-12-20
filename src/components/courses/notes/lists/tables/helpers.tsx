/**
 * Components - Courses - Notes - List - Table - Helper
 */

// React
import { MouseEvent, useContext } from 'react'

// UI
import {
  formatDateStandard,
  formatTime,
  Button,
  ButtonToolbar,
  OffCanvasContext,
  TableActions
} from '@drykiss/industry-ui'

// Types
import { Post, POST_TYPE } from '../../../../../types/post.d'
import { NotesTableRowsType } from './types.d'
import { Column } from '../../../../../types/column.d'
import { STATUS_ACTIVE } from '../../../../../types/select.d'
import { PostFilter } from '../../../../posts/hooks/usePost/types.d'

// Constants
import { THEME_CONTEXT } from '../../../../../constants/themeContext'

// Forms
import { NotesForm } from '../../forms/upsert/form'
import { offCanvasType } from '../../../../../types/offCanvas'

export const columns = ({
  handleDelete,
  handleEdit
}: {
  handleDelete: (_: MouseEvent<HTMLElement>, row: NotesTableRowsType) => void
  handleEdit: (_: MouseEvent<HTMLElement>, row: NotesTableRowsType) => void
}) => {
  const columnsSchema: Column<NotesTableRowsType>[] = [
    { text: 'id', hidden: true },
    { text: 'Title' },
    { text: 'content', hidden: true },
    { text: 'Date' },
    {
      text: 'Actions',
      formatter: TableActions,
      formatterData: [
        {
          context: THEME_CONTEXT.secondary,
          icon: ['fas', 'edit'],
          onClick: handleEdit,
          tooltip: 'Edit'
        },
        {
          context: THEME_CONTEXT.danger,
          icon: ['fas', 'trash'],
          onClick: handleDelete,
          tooltip: 'Delete'
        }
      ]
    }
  ]
  return columnsSchema
}

export const rows = (posts: Post[]) => {
  const list = posts?.map((post) => {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      date: `${formatDateStandard(post.updated_at)} ${formatTime(post.updated_at)}`,
      actions: ''
    }
  })
  return list
}

export const Toolbar = (filters: Partial<PostFilter>) => {
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)

  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    offCanvas.show({
      content: (
        <NotesForm
          onSuccess={offCanvas.close}
          defaultValues={{
            id: undefined,
            accountId: filters.accountId!,
            entityId: filters.entityId!,
            entity: filters.entity!,
            title: '',
            type: POST_TYPE.Note,
            content: undefined,
            status: STATUS_ACTIVE.Active
          }}
        />
      ),
      submit: true,
      title: 'Create a note'
    })
  }

  return (
    <ButtonToolbar>
      <Button context={THEME_CONTEXT.secondary} onClick={handleClick} size="sm" content="Add new" />
    </ButtonToolbar>
  )
}
