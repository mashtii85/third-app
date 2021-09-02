/**
 * Components - Courses - View
 */

// UI
import { Details2, Table, TableLink } from '@drykiss/industry-ui'

// Mocks
import { Courses } from '../../../../mocks/courses'

export const AdminDashboardView = () => {
  const columns = [
    {
      text: 'id',
      hidden: true
    },
    {
      formatter: TableLink('', 'id', 'name', 'url'),
      text: 'Title'
    },
    {
      text: 'Author'
    },
    {
      text: 'Progress'
    }
  ]

  const rows = () =>
    Courses.map((item) => {
      return {
        id: item.id,
        title: item.title,
        author: item.author,
        progress: item.progress
      }
    })

  return (
    <Details2 open summary="Courses">
      <Table columns={columns} rows={rows()} />
    </Details2>
  )
}
