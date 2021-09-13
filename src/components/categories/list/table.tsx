/**
 * Components - Taxonomy - List - Table
 */
// React
import { useContext, MouseEvent } from 'react'
// UI
import { capitalize, Details, OffCanvasContext, Table, TableActions } from '@drykiss/industry-ui'
import { TaxonomyForm } from '../form/form'
import { TaxonomyDelete } from '../module/delete'
// Next
import { useRouter } from 'next/router'
// Apollo
import { useQuery } from '@apollo/client'
import { GET_TAXONOMIES } from '../queries'
// Types
import { Column } from '../../../types/column'
import { TableProps } from './types'
import { offCanvasType } from '../../../types/offCanvas'
import { Taxonomy } from '../../../types/taxonomy'

export const TaxonomyTable = ({ title }: TableProps) => {
  const { query } = useRouter()
  const offCanvas: offCanvasType = useContext(OffCanvasContext)
  const defaultTab: string | string[] = query.tab || 'course-categories'

  // Table Column
  const columns: Column<Taxonomy>[] = [
    {
      text: 'Name'
    },
    {
      text: 'Status'
    },
    {
      hidden: false,
      formatter: TableActions,
      formatterData: [
        {
          context: 'secondary',
          icon: ['fas', 'edit'],
          onClick: (e: MouseEvent<HTMLElement>, row: Taxonomy) => handleClick(e, row),
          tooltip: 'Edit'
        },
        {
          context: 'danger',
          icon: ['fas', 'trash'],
          onClick: (e: MouseEvent<HTMLElement>, row: Taxonomy) => handleDelete(row),
          tooltip: 'Delete'
        }
      ],
      text: 'Actions'
    },
    { hidden: true }
  ]

  const handleDelete = (row: Taxonomy) => {
    offCanvas.show({
      content: <TaxonomyDelete taxonomyId={row.id} onSuccess={handleDeleteSuccess} />,
      title: 'Delete Taxonomy',
      submit: false
    })
  }

  const handleDeleteSuccess = () => offCanvas.close()

  const {
    data: { taxonomies } = {
      taxonomies: []
    },
    loading
  } = useQuery(GET_TAXONOMIES, {
    variables: {
      category: defaultTab
    }
  })

  const handleSuccess = () => {
    offCanvas.close()
  }

  const handleClick = (e: MouseEvent<HTMLElement>, row: Taxonomy) => {
    // TODO:  need to find a way to provide entity_id and client_id

    const defaultValues = row ? { ...row, status: row.status.toLowerCase() } : {}

    offCanvas.show({
      content: (
        <TaxonomyForm
          onSuccess={handleSuccess}
          defaultValues={{ entity_id: 1, client_id: 1, type: defaultTab, ...defaultValues }}
        />
      ),
      title: `${row ? 'Edit' : 'Add'} Course Category`
    })
  }

  const rows = () =>
    taxonomies.map((item: Taxonomy) => {
      return {
        name: item.name,
        status: capitalize(item.status),
        actions: '',
        id: item.id
      }
    })

  return (
    <Details button="Add New" open summary={title} handleClick={handleClick}>
      <Table fullHeight align columns={columns} loading={loading} rows={rows()} />
    </Details>
  )
}
