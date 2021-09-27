/**
 * Components - Lessons - List - Table - Helper
 */

// React
import { ChangeEvent, MouseEvent, useContext } from 'react'

// UI
import {
  formatTime,
  formatDateStandard,
  Button,
  OffCanvasContext,
  TableLink,
  TableActions
} from '@drykiss/industry-ui'

// Types
import { Lesson, LESSON_STATUS, LESSON_TYPE } from '../../../../types/lesson.d'
import { LessonTableRowsType } from './types.d'

// Pages
import pages from '../../../../config/pages'

// Forms
import { LessonForm } from '../../form/create/form'

interface ToolbarModel {
  courseId?: number
  moduleId?: number
}

export const columns = ({
  handleDelete,
  handleEdit,
  handleQuestions
}: {
  handleDelete: (_: ChangeEvent<HTMLInputElement>, row: LessonTableRowsType) => void
  handleEdit: (_: ChangeEvent<HTMLInputElement>, row: LessonTableRowsType) => void
  handleQuestions: (_: ChangeEvent<HTMLInputElement>, row: LessonTableRowsType) => void
}) => {
  const columnsSchema = [
    { text: 'id', hidden: true },
    {
      formatter: TableLink(pages.dashboard.coursesClient.view_by_id, 'id', 'title'),
      text: 'Title'
    },
    { text: 'Description', hidden: true },
    { text: 'Type' },
    { text: 'Content', hidden: true },
    { text: 'Status' },
    { text: 'Date' },
    {
      text: 'Actions',
      formatter: TableActions,
      formatterData: [
        {
          context: 'secondary',
          icon: ['fas', 'edit'],
          onClick: handleEdit,
          tooltip: 'Edit'
        },
        {
          context: 'danger',
          icon: ['fas', 'trash'],
          onClick: handleDelete,
          tooltip: 'Delete'
        },
        {
          context: 'info',
          icon: ['fas', 'question'],
          onClick: handleQuestions,
          tooltip: 'Questions'
        }
      ]
    }
  ]
  return columnsSchema
}

export const rows = (lessons: Lesson[]) => {
  const list = lessons?.map((lesson) => {
    return {
      id: lesson.id,
      title: lesson.title,
      description: lesson.description,
      type: lesson.type,
      content: lesson.content,
      status: lesson.status,
      date: `${formatDateStandard(lesson.updated_at)} ${formatTime(lesson.updated_at)}`,
      actions: ''
    }
  })
  return list
}

export const Toolbar = ({ courseId, moduleId }: ToolbarModel) => {
  const offCanvas = useContext<any>(OffCanvasContext)
  const filters = { courseId, moduleId }

  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    offCanvas.show({
      content: (
        <LessonForm
          filters={filters}
          onSuccess={offCanvas.close}
          defaultValues={{
            type: LESSON_TYPE.Text,
            status: LESSON_STATUS.Active
          }}
        />
      ),
      submit: true,
      title: 'Add a lesson'
    })
  }

  return <Button context="white" onClick={handleClick} size="sm" content="Create a lesson" />
}
