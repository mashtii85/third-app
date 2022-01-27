/**
 * Components - Lessons - List - Table - Helper
 */

// React
import { MouseEvent } from 'react'

// UI
import { formatTime, formatDateStandard, TableLink, TableActions } from '@drykiss/industry-ui'

// Types
import { Column, Lesson, LessonTableRowsType, pages } from '@availabletowork/types'

// Constants
import { THEME_CONTEXT } from '@availabletowork/types'

export const columns = ({
  lessons,
  handleDelete,
  handleEdit,
  handleFileUpload,
  handleArrowUp,
  handleArrowDown
}: {
  lessons: Lesson[]
  handleDelete: (_: MouseEvent<HTMLElement>, row: LessonTableRowsType) => void
  handleEdit: (_: MouseEvent<HTMLElement>, row: LessonTableRowsType) => void
  handleFileUpload: (_: MouseEvent<HTMLElement>, row: LessonTableRowsType) => void
  handleArrowUp: (_: MouseEvent<HTMLElement>, row: LessonTableRowsType) => void
  handleArrowDown: (_: MouseEvent<HTMLElement>, row: LessonTableRowsType) => void
}) => {
  const isDisabled = (up: boolean, ordering: number): boolean =>
    up ? ordering === lessons[0].ordering : ordering === lessons[lessons.length - 1].ordering

  const actionFormatter = ({ row }: { row: LessonTableRowsType }) =>
    TableActions({
      row: row,
      data: [
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
        },
        {
          context: THEME_CONTEXT.dark,
          icon: ['fas', 'file-upload'],
          onClick: handleFileUpload,
          tooltip: 'Upload'
        },
        {
          context: THEME_CONTEXT.white,
          icon: ['fas', 'arrow-up'],
          onClick: handleArrowUp,
          tooltip: 'Up',
          disabled: isDisabled(true, row?.ordering)
        },
        {
          context: THEME_CONTEXT.white,
          icon: ['fas', 'arrow-down'],
          onClick: handleArrowDown,
          tooltip: 'Down',
          disabled: isDisabled(false, row?.ordering)
        }
      ]
    })

  const columnsSchema: Column<LessonTableRowsType>[] = [
    { text: 'id', hidden: true },
    {
      formatter: TableLink(pages.dashboard.lessons.view_by_id, 'id', 'title'),
      text: 'Title'
    },
    { text: 'Description', hidden: true },
    { text: 'Type' },
    { text: 'Content', hidden: true },
    { text: 'Ordering', hidden: true },
    { text: 'Status' },
    { text: 'Date' },
    {
      text: 'Actions',
      formatter: actionFormatter
    }
  ]
  return columnsSchema
}

export const rows = (lessons: Lesson[]) => {
  const list = lessons.map((lesson) => {
    return {
      id: lesson.id,
      title: lesson.title,
      description: lesson.description,
      type: lesson.type,
      content: lesson.content,
      ordering: lesson.ordering,
      status: lesson.status,
      date: `${formatDateStandard(lesson.updated_at)} ${formatTime(lesson.updated_at)}`,
      actions: ''
    }
  })
  return list
}
