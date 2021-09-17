/**
 * Components - Lessons - List - Table - Table
 */

// UI
import { Table } from '@drykiss/industry-ui'

// Helpers
import { columns, rows } from './helpers'

// Hooks
import { useLessons } from '../../hooks/useLessons'

// Type
import { UseLessonsProps } from '../../hooks/types'

export const LessonTable = (filters: UseLessonsProps) => {
  const { lessonList, loading } = useLessons(filters)

  return <Table loading={loading} columns={columns()} rows={rows(lessonList)} />
}
