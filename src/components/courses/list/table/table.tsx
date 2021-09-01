/**
 * Components - Courses - List - Table - Table
 */

// React

// UI
import { Details2, Table } from '@drykiss/industry-ui'

// Mocks
import { Courses } from '../../../../mocks/courses'

// Helper
import { columns, rows, Toolbar } from './helper'

export const CourseTable = () => {
  return (
    <Details2 open title="Courses" toolbar={<Toolbar />}>
      <Table columns={columns()} rows={rows(Courses)} />
    </Details2>
  )
}
