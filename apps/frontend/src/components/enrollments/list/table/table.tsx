/**
 * Components - Enrollments - Lists - EnrolledUsers - Table - Table
 */

// UI
import { Details, Table } from '@drykiss/industry-ui'
import { useTable } from '../../../common/hooks/useTable'
import { useEnrollments } from '../../hooks'

// Types
import { EnrollmentFilters } from '@availabletowork/types'

// Helpers
import { columns, rows } from './helpers'

// Hooks
import { useCurrentUser } from '../../../../utils/useCurrentUser'

interface EnrollmentsTableProps {
  courseId: number
  filters: Partial<EnrollmentFilters>
}

const initialSort = {}

export const EnrolledUsersTable = ({ courseId, filters }: EnrollmentsTableProps) => {
  const { initialData, ref } = useTable({ filters, initialSort })
  const { user } = useCurrentUser()

  const { enrollments, error, loading } = useEnrollments({
    filters: { ...initialData, courseId, clientId: user.id }
  })

  if (error) {
    console.error(error)
  }

  return (
    <Details open title="Enrollments">
      <Table loading={loading} columns={columns()} rows={rows(enrollments)} ref={ref} />
    </Details>
  )
}
