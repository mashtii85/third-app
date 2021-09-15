/**
 * Components - Courses - List - Table - Table
 */

// UI
import { Details2, Table } from '@drykiss/industry-ui'
import { useTable } from '../../../../common/hooks/useTable'

// Helpers
import { columns, rows, Toolbar } from './helpers'

// Hooks
import { useEnrollments } from '../../../hooks'

// Types
import { EnrollmentsFilters } from '../../../hooks/useEnrollments/types'

interface EnrollmentsTableProps {
  clientId: number
  filters: EnrollmentsFilters
}

const initialSort = {}

export const EnrollmentsTable = ({ clientId, filters }: EnrollmentsTableProps) => {
  const { initialData, ref } = useTable({ filters, initialSort })

  const { enrollments, error, loading } = useEnrollments({
    clientId,
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
