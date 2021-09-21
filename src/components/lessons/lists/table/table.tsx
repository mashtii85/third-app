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
import { LessonFormType } from '../../form/add/types.d'
import { LessonForm } from '../../form/add/form'
import { DeleteLessonForm } from '../../form/delete/delete'

export const LessonTable = (filters: UseLessonsProps) => {
  const offCanvas = useContext<any>(OffCanvasContext)
  const { lessonList, loading } = useLessons(filters)

  const handleDelete = (e: ChangeEvent<HTMLInputElement>, row: LessonTableRowsType) => {
    console.log(e)
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

  const handleEdit = (e: ChangeEvent<HTMLInputElement>, row: LessonTableRowsType) => {
    console.log(e)
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

  return (
    <Table
      loading={loading}
      columns={columns({ handleDelete, handleEdit })}
      rows={rows(lessonList)}
    />
  )
}
