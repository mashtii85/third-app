/**
 * Components - Courses - List - Table - Table
 */

// React
import { MouseEvent, useContext } from 'react'

// UI
import { Details, OffCanvasContext, Table } from '@drykiss/industry-ui'
import { useTable } from '../../../common/hooks/useTable'

// Helpers
import { columns, prepareEditCourseValues, rows, Toolbar } from './helpers'

// Hooks
import { useCourses } from '../../hooks'

// Types
import {
  CourseFilter,
  CourseTableProps,
  CourseTableRowsType,
  offCanvasType
} from '@availabletowork/types'

import { DeleteCourseForm, UpsertCourseForm } from '../../forms'

const initialSort = {}

export const CourseTable = ({ filters }: CourseTableProps) => {
  const { initialData, ref } = useTable<CourseFilter>({ filters, initialSort })

  const { courseList, loading } = useCourses({
    filters: initialData
  })

  const offCanvas = useContext<offCanvasType>(OffCanvasContext)

  const handleDelete = (_: MouseEvent<HTMLElement>, row: CourseTableRowsType) => {
    offCanvas.show({
      content: (
        <DeleteCourseForm
          id={row.id}
          title={row.title}
          onSuccess={offCanvas.close}
          filters={initialData}
        />
      ),
      submit: false,
      title: 'Delete Course'
    })
  }

  const handleEdit = (_: MouseEvent<HTMLElement>, row: CourseTableRowsType) => {
    const defaultValues = prepareEditCourseValues(row)
    offCanvas.show({
      content: (
        <UpsertCourseForm
          onSuccess={offCanvas.close}
          filters={filters}
          defaultValues={defaultValues}
        />
      ),
      submit: true,
      title: 'Edit Course'
    })
  }

  return (
    <Details open title="Courses" toolbar={<Toolbar filters={initialData} />}>
      <Table
        loading={loading}
        columns={columns({ handleDelete, handleEdit })}
        rows={rows(courseList)}
        ref={ref}
      />
    </Details>
  )
}
