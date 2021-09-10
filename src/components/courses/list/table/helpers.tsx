/**
 * Components - Courses - List - Table - Helper
 */

// React
import { MouseEvent, useContext } from 'react'

// UI
import { Button, OffCanvasContext, TableLink } from '@drykiss/industry-ui'

// Types
import type { Course } from '../../../../types/course.d'
import { CourseTableRowsType } from './types.d'

import { CourseForm } from '../../form'

import pages from '../../../../config/pages.json'

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
    text: 'Author'
  },
  {
    text: 'Enrolled Users'
  }
]

export const rows = (courses: Course[]): CourseTableRowsType[] => {
  const list = courses.map((item) => {
    return {
      id: item.id,
      title: item.title,
      author: item.custom_fields?.author || '',
      enrolled: item.enrolled?.aggregate?.count ?? 0
    }
  })

  return list
}

export const Toolbar = ({ filters }: { filters: any }) => {
  // we don't know it's type
  const offCanvas = useContext<any>(OffCanvasContext)

  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    offCanvas.show({
      content: (
        <CourseForm
          onSuccess={() => {
            offCanvas.close()
          }}
          filters={filters}
        />
      ),
      submit: true,
      title: 'Add A Course'
    })
  }

  return <Button context="white" onClick={handleClick} size="sm" content="Create A Course" />
}
