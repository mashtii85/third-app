/**
 * Components - Courses - List - Table - Helper
 */

// React
import { MouseEvent, useContext } from 'react'

// UI
import { Button, OffCanvasContext, TableActions, TableLink } from '@drykiss/industry-ui'

// Constants
import { pages, THEME_CONTEXT } from '@availabletowork/constants'

// Types
import { UpsertCourseForm } from '../../forms'
import {
  Column,
  Course,
  CourseFilter,
  CourseFormType,
  CourseTableRowsType,
  offCanvasType,
  Options
} from '@availabletowork/types'

// Utils
import { formatToValidDate } from '../../../../utils/dateFormatter'

export const columns = ({
  handleDelete,
  handleEdit
}: {
  handleDelete: (e: MouseEvent<HTMLElement>, row: CourseTableRowsType) => void
  handleEdit: (e: MouseEvent<HTMLElement>, row: CourseTableRowsType) => void
}) => {
  const columnsSchema: Column<CourseTableRowsType>[] = [
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
    { text: 'Type' },
    { text: 'Author' },
    { text: 'Enrolled Users' },
    {
      hidden: true,
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
        }
      ],
      text: 'Actions'
    }
  ]
  return columnsSchema
}

export const rows = (courses: Course[] = []): CourseTableRowsType[] => {
  const list = courses.map((item) => {
    return {
      taxonomy: item.taxonomy,
      custom_fields: item.custom_fields,
      taxonomy_id: item.taxonomy_id,
      id: item.id,
      title: item.title,
      type: item.taxonomy?.name,
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
      content: <UpsertCourseForm onSuccess={offCanvas.close} filters={filters} />,
      submit: true,
      title: 'Add a Course'
    })
  }

  return (
    <div data-cy="create-course-button">
      <Button context="white" onClick={handleClick} size="sm" content="Create a Course" />
    </div>
  )
}

export const prepareEditCourseValues = (row: CourseTableRowsType): CourseFormType => {
  const taxonomy: Options = row.taxonomy && {
    value: row.taxonomy?.id,
    label: row.taxonomy?.name
  }

  return {
    ...row,
    id: row.id,
    title: row.title,
    status: row.status,
    description: row.description,
    taxonomy,
    custom_fields: formatToValidDate(row?.custom_fields)
  }
}
