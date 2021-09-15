/**
 * Components - Enrollments - Lists - EnrolledUsers - Table - Table
 */

// UI
import { Details2, Table } from '@drykiss/industry-ui'
import { useTable } from '../../../../common/hooks/useTable'
import { useEnrolledUsers } from '../../../hooks'

// Types
import { EnrollmentsFilters } from '../../../hooks/useEnrollments/types'

// Helpers
import { columns, rows, Toolbar } from './helpers'

interface EnrollmentsTableProps {
  courseId: number
  filters: EnrollmentsFilters
}

const initialSort = {}

export const EnrolledUsersTable = ({ courseId, filters }: EnrollmentsTableProps) => {
  const { initialData, ref } = useTable({ filters, initialSort })

  const { enrollments, error, loading } = useEnrolledUsers({
    courseId,
    filters: initialData
  })

  if (error) {
    console.error(error)
  }

  return (
    <Details2 open title="Enrollments" toolbar={<Toolbar filters={initialData} />}>
      <Table loading={loading} columns={columns()} rows={rows(enrollments)} ref={ref} />
    </Details2>
  )
}
