/**
 * Components - Courses - List - Table - Helper
 */

// React
import { MouseEvent, useContext } from 'react'

// UI
import { Button, formatDateStandard, OffCanvasContext, TableLink } from '@drykiss/industry-ui'

// Types
import { EnrollmentsTableRowsType } from './types'

import { CourseForm } from '../../../form'

import pages from '../../../../../config/pages.json'

// Types
import { LooseObject } from '../../../../../types/object'
import { Enrollment } from '../../../hooks/useEnrollments/types'

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
    formatter: ({ row }: { row: EnrollmentsTableRowsType }) => formatDateStandard(row.date)
  }
]

export const rows = (enrollments: Enrollment[]): EnrollmentsTableRowsType[] => {
  const list = enrollments.map((item) => {
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
  // we don't know it's type
  const offCanvas = useContext<any>(OffCanvasContext)

  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    offCanvas.show({
      content: <CourseForm onSuccess={offCanvas.close} filters={filters} />,
      submit: true,
      title: 'Add An Enrollment'
    })
  }

  return <Button context="white" onClick={handleClick} size="sm" content="Create A Course" />
}
