/**
 * Components - Courses - Notes - List - Table
 */

// React
import { MouseEvent, useContext } from 'react'

// UI
import { Details2, Table, OffCanvasContext } from '@drykiss/industry-ui'

// Helpers
import { Toolbar, columns, rows } from './helpers'

// Hooks
import { usePost } from '../../../../posts/hooks/usePost/usePost'

// Forms
import { NotesForm } from '../../forms/upsert/form'
import { NotesDeleteForm } from '../../forms/delete/delete'

// Types
import { PostFilter } from '../../../../posts/hooks/usePost/types.d'
import { NotesTableRowsType } from './types.d'
import { NotesFormType } from '../../forms/upsert/types.d'
import { PostDeleteType } from '../../../../posts/hooks/useDelete/types.d'
import { offCanvasType } from '../../../../../types/offCanvas'

export const NotesTable = (filters: Partial<PostFilter>) => {
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)
  const { posts, loading } = usePost(filters)

  const handleDelete = (_: MouseEvent<HTMLElement>, row: NotesTableRowsType) => {
    const notesDeleteProps: PostDeleteType = {
      id: row.id,
      accountId: filters.accountId!,
      entity: filters.entity!,
      entityId: filters.entityId!,
      title: row.title,
      type: filters.type
    }
    offCanvas.show({
      content: <NotesDeleteForm notesDeleteProps={notesDeleteProps} onSuccess={offCanvas.close} />,
      title: 'Delete note',
      submit: false
    })
  }

  const handleEdit = (_: MouseEvent<HTMLElement>, row: NotesTableRowsType) => {
    const defaultValues: Partial<NotesFormType> = {
      id: row.id,
      title: row.title,
      content: row.content
    }
    offCanvas.show({
      content: <NotesForm onSuccess={offCanvas.close} defaultValues={defaultValues} />,
      submit: true,
      title: 'Edit note'
    })
  }

  return (
    <Details2
      open
      title="Notes"
      toolbar={
        <Toolbar
          accountId={filters.accountId}
          entity={filters.entity}
          entityId={filters.entityId}
          type={filters.type}
        />
      }
    >
      <Table loading={loading} columns={columns({ handleDelete, handleEdit })} rows={rows(posts)} />
    </Details2>
  )
}
