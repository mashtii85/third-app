/**
 * Components - Enrollments - Lists - EnrolledUsers - Table - Table
 */

// React
import { useContext } from 'react'

// UI
import { Details2, Table, UserContext } from '@drykiss/industry-ui'
import { useTable } from '../../../common/hooks/useTable'
import { useEnrollments } from '../../hooks'

// Types
import { EnrollmentFilters } from '../../hooks/useEnrollments/types'

// Helpers
import { columns, rows } from './helpers'

interface EnrollmentsTableProps {
  courseId: number
  filters: EnrollmentFilters
}

const initialSort = {}

export const EnrolledUsersTable = ({ courseId, filters }: EnrollmentsTableProps) => {
  const { initialData, ref } = useTable({ filters, initialSort })
  const { user } = useContext(UserContext)

  const { enrollments, error, loading } = useEnrollments({
    filters: { ...initialData, courseId, clientId: user.id }
  })

  if (error) {
    console.error(error)
  }

  return (
    <Details2 open title="Enrollments">
      <Table loading={loading} columns={columns()} rows={rows(enrollments)} ref={ref} />
    </Details2>
  )
}
