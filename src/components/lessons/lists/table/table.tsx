/**
 * Components - Lessons - List - Table - Table
 */

// React
import { MouseEvent, useContext } from 'react'

// UI
import { Table, OffCanvasContext } from '@drykiss/industry-ui'

// Helpers
import { columns, rows } from './helpers'

// Hooks
import { useLessons } from '../../hooks/useLessons'

// Forms
import { MediaTable } from '../.../../../../media/lists/table/table'
import { LessonForm } from '../../form/create/form'
import { DeleteLessonForm } from '../../form/delete/delete'
import { LessonQuestionsTable } from '../../questions/lists/table/table'

// Types
import { UseLessonsProps } from '../../hooks/types'
import { LessonTableRowsType } from '../table/types'
import { LessonFormType } from '../../form/create/types'
import { MediaTableProps } from '../../../media/lists/table/types.d'
import { MEDIUM_CATEGORY, MEDIUM_TYPE } from '../../../../types/medium.d'
import { STATUS_ACTIVE } from '../../../../types/select.d'
import { offCanvasType } from '../../../../types/offCanvas'

export const LessonTable = (filters: Partial<UseLessonsProps>) => {
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)
  const { lessonList, loading } = useLessons(filters)

  const handleDelete = (_: MouseEvent<HTMLElement>, row: LessonTableRowsType) => {
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

  const handleEdit = (_: MouseEvent<HTMLElement>, row: LessonTableRowsType) => {
    const defaultValues: LessonFormType = {
      id: row.id,
      title: row.title,
      description: row.description,
      type: row.type,
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

  const handleQuestions = (_: MouseEvent<HTMLElement>, row: LessonTableRowsType) => {
    offCanvas.show({
      content: (
        <LessonQuestionsTable entity="lesson" entityId={row.id as number} type="lesson-questions" />
      ),
      submit: false,
      title: 'Quiz'
    })
  }

  const handleFileUpload = (_: MouseEvent<HTMLElement>, row: LessonTableRowsType) => {
    const mediaTableProps: MediaTableProps = {
      entity: 'lesson',
      entityId: row.id as number,
      category: MEDIUM_CATEGORY.Lesson,
      status: STATUS_ACTIVE.Active,
      type: MEDIUM_TYPE.Image
    }
    offCanvas.show({
      content: <MediaTable mediaTableProps={mediaTableProps} />,
      submit: false,
      title: 'Attachments'
    })
  }

  return (
    <Table
      loading={loading}
      columns={columns({ handleDelete, handleEdit, handleQuestions, handleFileUpload })}
      rows={rows(lessonList)}
    />
  )
}
