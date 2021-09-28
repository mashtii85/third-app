/**
 * Components - Lessons - List - Table - Table
 */

// React
import { ChangeEvent, useContext } from 'react'

// UI
import { Table, OffCanvasContext } from '@drykiss/industry-ui'

// Helpers
import { columns, rows } from './helpers'

// Hooks
import { useLessons } from '../../hooks/useLessons'

// Type
import { UseLessonsProps } from '../../hooks/types'
import { LessonTableRowsType } from '../table/types'
import { LessonFormType } from '../../form/create/types'
import { LessonForm } from '../../form/create/form'
import { DeleteLessonForm } from '../../form/delete/delete'
import { LessonQuestionsTable } from '../../questions/lists/table/table'

export const LessonTable = (filters: UseLessonsProps) => {
  const offCanvas = useContext<any>(OffCanvasContext)
  const { lessonList, loading } = useLessons(filters)

  const handleDelete = (_: ChangeEvent<HTMLInputElement>, row: LessonTableRowsType) => {
    offCanvas.show({
      content: (
        <DeleteLessonForm
          id={row.id!}
          moduleId={filters.moduleId as number}
          title={row.title}
          onSuccess={offCanvas.close}
        />
      ),
      submit: false,
      title: 'Delete Lesson'
    })
  }

  const handleEdit = (_: ChangeEvent<HTMLInputElement>, row: LessonTableRowsType) => {
    const defaultValues: LessonFormType = {
      id: row.id,
      title: row.title,
      description: row.description,
      type: row.type,
      content: row.content,
      status: row.status
    }
    offCanvas.show({
      content: (
        <LessonForm onSuccess={offCanvas.close} filters={filters} defaultValues={defaultValues} />
      ),
      submit: true,
      title: 'Edit Lesson'
    })
  }

  const handleQuestions = (_: ChangeEvent<HTMLInputElement>, row: LessonTableRowsType) => {
    offCanvas.show({
      content: <LessonQuestionsTable entity="lesson" entityId={row.id} type="lesson-questions" />,
      submit: false,
      title: 'Questions'
    })
  }

  return (
    <Table
      loading={loading}
      columns={columns({ handleDelete, handleEdit, handleQuestions })}
      rows={rows(lessonList)}
    />
  )
}
