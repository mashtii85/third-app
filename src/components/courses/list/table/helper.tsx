/**
 * Components - Courses - List - Table - Helper
 */

// React
import { MouseEvent, useContext } from 'react'

// UI
import { Button, OffCanvasContext, TableLink } from '@drykiss/industry-ui'

import type { Course } from '../../../../types/course.d'

import { CourseForm } from '../../form'

export const columns = () => [
  {
    text: 'id',
    hidden: true
  },
  {
    formatter: TableLink('/dashboard/properties/view', 'id', 'title'),
    text: 'Title'
  },
  {
    text: 'Author'
  },
  {
    text: 'Progress'
  }
]

export const rows = (courses: Course[]) => {
  const list = courses.map((item) => {
    return {
      id: item.id,
      title: item.title,
      author: item.author,
      progress: item.progress
    }
  })

  return list
}

export const Toolbar = () => {
  // we don't know it's type
  const offCanvas = useContext<any>(OffCanvasContext)

  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    offCanvas.show({
      content: <CourseForm />,
      submit: true,
      title: 'Add A Course'
    })
  }

  return <Button context="white" onClick={handleClick} size="sm" content="Create A Course" />
}
