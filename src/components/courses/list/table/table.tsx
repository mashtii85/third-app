/**
 * Components - Courses - List - Table - Table
 */

// UI
import { Details2, Table } from '@drykiss/industry-ui'
import { useTable } from '../../../hooks/useTable'

// Helpers
import { columns, rows, Toolbar } from './helpers'

// Hooks
import { useCourses } from '../../hooks'

// Types
import { CourseFilter } from '../../hooks/types'

interface CourseTableProps {
  clientId: number
  filters: CourseFilter
}

const initialSort = {}

export const CourseTable = ({ clientId, filters }: CourseTableProps) => {
  const { initialData, ref } = useTable({ filters, initialSort })

  const { courseList, loading } = useCourses({
    clientId,
    filters: initialData
  })

  return (
    <Details2 open title="Courses" toolbar={<Toolbar filters={initialData} />}>
      <Table loading={loading} columns={columns()} rows={rows(courseList)} ref={ref} />
    </Details2>
  )
}
