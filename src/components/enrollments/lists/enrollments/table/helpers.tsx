/**
 * Components - Courses - List - Table - Helper
 */

// React
import { MouseEvent, useContext } from 'react'

// UI
import { Button, formatDateStandard, OffCanvasContext, TableLink } from '@drykiss/industry-ui'

// Types
import { CourseTableRowsType } from './types'

import { CourseForm } from '../../../form'

import pages from '../../../../../config/pages'

// Types
import { LooseObject } from '../../../../../types/object'
import { Enrollment } from '../../../hooks/useEnrollments/types'
import { offCanvasType } from '../../../../../types/offCanvas'

export const columns = () => [
  {
    text: 'id',
    hidden: true
  },
  {
    formatter: TableLink(pages.dashboard.coursesClient.view_by_id, 'id', 'title'),
    text: 'Title'
  },
  {
    text: 'Status'
  },
  {
    text: 'Author'
  },
  {
    text: 'Date',
    formatter: ({ row }: { row: CourseTableRowsType }) => formatDateStandard(row.date)
  }
]

export const rows = (enrollments: Enrollment[]): CourseTableRowsType[] => {
  const list: CourseTableRowsType[] = enrollments.map((item) => {
    return {
      id: item.id,
      title: item.course.title,
      status: item.status,
      author: item.course.custom_fields?.author || '-',
      date: item.created_at
    }
  })

  return list
}

export const Toolbar = ({ filters }: { filters: LooseObject }) => {
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)

  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    offCanvas.show({
      content: <CourseForm onSuccess={offCanvas.close} filters={filters} />,
      submit: true,
      title: 'Add An Enrollment'
    })
  }

  return <Button context="white" onClick={handleClick} size="sm" content="Create a course" />
}
