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
  ButtonToolbar,
  OffCanvasContext,
  TableLink,
  TableActions
} from '@drykiss/industry-ui'

// Types
import { Lesson, LESSON_STATUS, LESSON_TYPE } from '../../../../types/lesson.d'
import { LessonTableRowsType, LessonToolbarType } from './types.d'
import { Column, FormatterData } from '../../../../types/column.d'
import { ModuleFormType } from '../../../module/forms/create/types.d'

// Constants
import { THEME_CONTEXT } from '../../../../constants/themeContext'

// Pages
import pages from '../../../../config/pages'

// Forms
import { LessonForm } from '../../form/create/form'
import { ModuleForm } from '../../../module/forms/create/form'
import { ModuleDeleteForm } from '../../../module/forms/delete/delete'
import { offCanvasType } from '../../../../types/offCanvas'

export const columns = ({
  handleDelete,
  handleEdit,
  handleFileUpload,
  handleArrowUp,
  handleArrowDown
}: {
  handleDelete: (_: MouseEvent<HTMLElement>, row: LessonTableRowsType) => void
  handleEdit: (_: MouseEvent<HTMLElement>, row: LessonTableRowsType) => void
  handleFileUpload: (_: MouseEvent<HTMLElement>, row: LessonTableRowsType) => void
  handleArrowUp: (_: MouseEvent<HTMLElement>, row: LessonTableRowsType) => void
  handleArrowDown: (_: MouseEvent<HTMLElement>, row: LessonTableRowsType) => void
}) => {
  const isDisabled = (): boolean => {
    const no = Math.random()
    console.log(no)
    return no > 0.5
  }
  const actionData: FormatterData<LessonTableRowsType>[] = [
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
      disabled: isDisabled()
    },
    {
      context: THEME_CONTEXT.white,
      icon: ['fas', 'arrow-down'],
      onClick: handleArrowDown,
      tooltip: 'Down',
      disabled: isDisabled()
    }
  ]

  const columnsSchema: Column<LessonTableRowsType>[] = [
    { text: 'id', hidden: true },
    {
      formatter: TableLink(pages.dashboard.lessons.view_by_id, 'id', 'title'),
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
      formatterData: actionData
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

export const Toolbar = (moduleToolbarProps: LessonToolbarType) => {
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)
  const filters = { courseId: moduleToolbarProps.courseId, moduleId: moduleToolbarProps.id }

  const handleEdit = (e: MouseEvent<HTMLElement>): void => {
    e.stopPropagation()
    const defaultValues: ModuleFormType = {
      id: moduleToolbarProps.id,
      courseId: moduleToolbarProps.courseId,
      title: moduleToolbarProps.title,
      description: moduleToolbarProps.description ?? '',
      ordering: moduleToolbarProps.ordering ?? 0,
      status: moduleToolbarProps.status
    }
    offCanvas.show({
      content: <ModuleForm onSuccess={offCanvas.close} defaultValues={defaultValues} />,
      submit: true,
      title: 'Add a module'
    })
  }

  const handleDelete = (e: MouseEvent<HTMLElement>): void => {
    e.stopPropagation()
    offCanvas.show({
      content: (
        <ModuleDeleteForm
          id={moduleToolbarProps.id!}
          courseId={moduleToolbarProps.courseId}
          title={moduleToolbarProps.title}
          onSuccess={offCanvas.close}
        />
      ),
      title: 'Delete module',
      submit: false
    })
  }

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

  return (
    <ButtonToolbar>
      <Button context="secondary" onClick={handleEdit} size="sm" startIcon="edit" />
      <Button context="danger" onClick={handleDelete} size="sm" startIcon="trash" />
      <Button context="white" onClick={handleClick} size="sm" content="Create a lesson" />
    </ButtonToolbar>
  )
}
