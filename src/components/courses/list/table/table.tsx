/**
 * Components - Courses - List - Table - Table
 */

// React
import { MouseEvent, useContext } from 'react'

// UI
import { Details2, OffCanvasContext, Table } from '@drykiss/industry-ui'
import { useTable } from '../../../common/hooks/useTable'

// Helpers
import { columns, prepareEditCourseValues, rows, Toolbar } from './helpers'
// Hooks
import { useCourses } from '../../hooks'
// Types
import { CourseFilter } from '../../hooks/types'
import { CourseTableProps, CourseTableRowsType } from './types'

import { DeleteCourse, CourseForm } from '../../forms'
import { offCanvasType } from '../../../../types/offCanvas'

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
        <DeleteCourse
          id={row.id!}
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
        <CourseForm onSuccess={offCanvas.close} filters={filters} defaultValues={defaultValues} />
      ),
      submit: true,
      title: 'Edit Course'
    })
  }

  return (
    <Details2 open title="Courses" toolbar={<Toolbar filters={initialData} />}>
      <Table
        loading={loading}
        columns={columns({ handleDelete, handleEdit })}
        rows={rows(courseList)}
        ref={ref}
      />
    </Details2>
  )
}
