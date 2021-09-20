/**
 * Components - Lessons - List - Table - Helper
 */

// React
import { MouseEvent, useContext } from 'react'

// UI
import {
  formatTime,
  formatDateStandard,
  Button,
  OffCanvasContext,
  TableLink
} from '@drykiss/industry-ui'

// Types
import { Lesson } from '../../../../types/lesson.d'
import { LessonTableRowsType } from './types.d'

// Pages
import pages from '../../../../config/pages'

// Forms
import { LessonForm } from '../../form/form'

interface ToolbarModel {
  courseId?: number
  moduleId?: number
}

export const columns = () => [
  {
    text: 'id',
    hidden: true
  },
  {
    formatter: TableLink(pages.dashboard.coursesClient.view_by_id, 'id', 'title'),
    text: 'Title'
  },
  { text: 'Status' },
  { text: 'Date' }
]

export const rows = (lessons: Lesson[]): LessonTableRowsType[] => {
  const list = lessons.map((lesson) => {
    return {
      id: lesson.id,
      title: lesson.title,
      status: lesson.status,
      date: `${formatDateStandard(lesson.updated_at)} ${formatTime(lesson.updated_at)}`
    }
  })
  return list
}

export const Toolbar = ({ courseId, moduleId }: ToolbarModel) => {
  const offCanvas = useContext<any>(OffCanvasContext)
  const filters = {}

  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    offCanvas.show({
      content: (
        <LessonForm
          courseId={courseId}
          moduleId={moduleId}
          onSuccess={offCanvas.close}
          filters={filters}
        />
      ),
      submit: true,
      title: 'Add A Lesson'
    })
  }
  return <Button context="white" onClick={handleClick} size="sm" content="Create A Lesson" />
}
