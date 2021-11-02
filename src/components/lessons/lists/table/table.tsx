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
import { useLessons } from '../../hooks/useLesson/useLessons'
import { useSwapLesson } from '../../hooks/useSwapLessons/useSwapLessons'

// Forms
import { MediaTable } from '../.../../../../media/lists/table/table'
import { LessonForm } from '../../form/create/form'
import { DeleteLessonForm } from '../../form/delete/delete'

// Constants
import { ENTITIES } from '../../../../constants/entities'

// Types
import { LessonTableRowsType } from '../table/types.d'
import { LessonFormType } from '../../form/create/types.d'
import { MediaTableProps } from '../../../media/lists/table/types.d'
import { MEDIUM_CATEGORY, MEDIUM_TYPE } from '../../../../types/medium.d'
import { STATUS_ACTIVE } from '../../../../types/select.d'
import { offCanvasType } from '../../../../types/offCanvas.d'
import { UseLessonsProps } from '../../hooks/useLesson/types.d'
import { SwapLessonsProps } from '../../hooks/useSwapLessons/types.d'

export const LessonTable = (filters: Partial<UseLessonsProps>) => {
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)
  const { lessonList, loading } = useLessons(filters)

  const { updateLesson } = useSwapLesson({
    onCompleted: () => { },
    onError: (error) => {
      console.error(error)
    }
  })

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

  const handleFileUpload = (_: MouseEvent<HTMLElement>, row: LessonTableRowsType) => {
    const mediaTableProps: MediaTableProps = {
      entity: ENTITIES.Lesson,
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

  const handleArrowUp = (_: MouseEvent<HTMLElement>, row: LessonTableRowsType) => {
    const selectedIndex = lessonList.findIndex((lesson) => lesson.id === row.id)
    if (selectedIndex === 0) return
    const down = lessonList[selectedIndex - 1]
    const up = lessonList[selectedIndex]
    const variables: SwapLessonsProps = {
      downId: down.id,
      downOrdering: up.ordering!,
      upId: up.id,
      upOrdering: down.ordering!
    }
    updateLesson({ variables })
  }

  const handleArrowDown = (_: MouseEvent<HTMLElement>, row: LessonTableRowsType) => {
    const selectedIndex = lessonList.findIndex((lesson) => lesson.id === row.id)
    if (selectedIndex === lessonList.length - 1) return
    const down = lessonList[selectedIndex]
    const up = lessonList[selectedIndex + 1]
    const variables: SwapLessonsProps = {
      downId: down.id,
      downOrdering: up.ordering!,
      upId: up.id,
      upOrdering: down.ordering!
    }
    updateLesson({ variables })
  }

  return (
    <Table
      loading={loading}
      columns={columns({
        lessons: lessonList,
        handleDelete,
        handleEdit,
        handleFileUpload,
        handleArrowUp,
        handleArrowDown
      })}
      rows={rows(lessonList)}
    />
  )
}
