/**
 * Components - Courses - List - Table - Helper
 */

// React
import { ChangeEvent, MouseEvent, useContext } from 'react'

// UI
import { Button, OffCanvasContext, TableActions, TableLink } from '@drykiss/industry-ui'

// Types
import type { Course } from '../../../../types/course.d'
import { CourseTableRowsType } from './types.d'

import { CourseForm } from '../../form'

import pages from '../../../../config/pages'

// Types
import { CourseFilter } from '../../hooks/types.d'
import { offCanvasType } from '../../../../types/offCanvas'

export const columns = ({
  handleDelete,
  handleEdit
}: {
  handleDelete: (e: ChangeEvent<HTMLInputElement>, row: CourseTableRowsType) => void
  handleEdit: (e: ChangeEvent<HTMLInputElement>, row: CourseTableRowsType) => void
}) => {
  return [
    {
      text: 'taxonomy',
      hidden: true
    },
    {
      text: 'custom_fields',
      hidden: true
    },
    {
      text: 'taxonomy_id',
      hidden: true
    },
    {
      text: 'id',
      hidden: true
    },
    {
      formatter: TableLink(pages.dashboard.coursesClient.view_by_id, 'id', 'title'),
      text: 'Title'
    },
    {
      text: 'Author'
    },
    {
      text: 'Enrolled Users'
    },
    {
      hidden: 'true',
      text: 'Status'
    },
    {
      hidden: true,
      text: 'Description'
    },
    {
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
        }
      ],
      text: 'Actions'
    }
  ]
}

export const rows = (courses: Course[]): CourseTableRowsType[] => {
  const list = courses.map((item) => {
    return {
      taxonomy: item.taxonomy,
      custom_fields: item.custom_fields,
      taxonomy_id: item.taxonomy_id,
      id: item.id,
      title: item.title,
      author: item.custom_fields?.author || '',
      enrolled: item.enrolled?.aggregate?.count ?? 0,
      status: item.status,
      description: item.description,
      actions: ''
    }
  })

  return list
}

export const Toolbar = ({ filters }: { filters: CourseFilter }) => {
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)

  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    offCanvas.show({
      content: <CourseForm onSuccess={offCanvas.close} filters={filters} />,
      submit: true,
      title: 'Add a course'
    })
  }

  return <Button context="white" onClick={handleClick} size="sm" content="Create a course" />
}
