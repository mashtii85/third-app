/**
 * Components - Courses - List - Table - Table
 */

// React
import { MouseEvent, useContext } from 'react'

// UI
import { Details2, OffCanvasContext, Table } from '@drykiss/industry-ui'
import { useTable } from '../../../common/hooks/useTable'

// Helpers
import { columns, rows, Toolbar } from './helpers'
// Utils
import { formatToValidDate } from '../../../../utils/dateFormatter'
// Hooks
import { useCourses } from '../../hooks'
// Types
import { CourseFilter } from '../../hooks/types'
import { CourseTableProps, CourseTableRowsType } from './types'

import { DeleteCourse, CourseForm } from '../../forms'
import { offCanvasType } from '../../../../types/offCanvas'

const initialSort = {}

export const CourseTable = ({ clientId, filters }: CourseTableProps) => {
  const { initialData, ref } = useTable<CourseFilter>({ filters, initialSort })

  const { courseList, loading } = useCourses({
    accountId: clientId,
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
          clientId={clientId}
        />
      ),
      submit: false,
      title: 'Delete Course'
    })
  }

  const handleEdit = (_: MouseEvent<HTMLElement>, row: CourseTableRowsType) => {
    offCanvas.show({
      content: (
        <CourseForm
          onSuccess={offCanvas.close}
          filters={filters}
          defaultValues={{
            ...row,
            id: row.id,
            title: row.title,
            status: row.status,
            description: row.description,
            taxonomy: { value: row?.taxonomy?.id, label: row?.taxonomy?.name },
            custom_fields: formatToValidDate(row?.custom_fields)
          }}
        />
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
