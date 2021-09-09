/**
 * Components - Taxonomy - List - Table
 */
// React
import { useContext } from 'react'
// UI
import { capitalize, Details, OffCanvasContext, Table } from '@drykiss/industry-ui'
import { TaxonomyForm } from '../form/form'
// Next
import { useRouter } from 'next/router'
// Apollo
import { useQuery } from '@apollo/client'
import { GET_TAXONOMIES } from '../query'
// Types
import { Column } from '../../../types/column'
import { TableProps } from './types'
import { offCanvasType } from '../../../types/offCanvas'
import { Taxonomy } from '../../../types/taxonomy'

// Table Column
const columns: Column[] = [
  {
    text: 'Id'
  },
  {
    text: 'Name'
  },
  {
    text: 'Entity'
  },

  {
    text: 'Status'
  }
]

export const TaxonomyTable = ({ title }: TableProps) => {
  const { query } = useRouter()
  const offCanvas: offCanvasType = useContext(OffCanvasContext)
  const defaultTab: string | string[] = query.tab || 'course-categories'

  const {
    data: { taxonomy } = {
      taxonomy: []
    },
    loading,
    refetch
  } = useQuery(GET_TAXONOMIES, {
    variables: {
      category: defaultTab
    }
  })

  const handleSuccess = () => {
    refetch()
    offCanvas.close()
  }

  const handleClick = () => {
    // TODO:  need to find a way to provide entity_id and client_id
    offCanvas.show({
      content: (
        <TaxonomyForm
          onSuccess={handleSuccess}
          defaultValues={{ entity_id: 1, client_id: 1, type: defaultTab }}
        />
      ),
      title: 'Add Course Category'
    })
  }

  const rows = () =>
    taxonomy.map((item: Taxonomy) => {
      return {
        id: item.id,
        name: item.name,
        entity: item.entity,
        status: capitalize(item.status)
      }
    })

  return (
    <Details button="Add New" open summary={title} handleClick={handleClick}>
      <Table columns={columns} loading={loading} rows={rows()} />
    </Details>
  )
}
