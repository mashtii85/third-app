/**
 * Components - Taxonomy - List - Table - Table
 */
// React
import { useContext, MouseEvent } from 'react'

// Next
import { useRouter } from 'next/router'
// Apollo
import { useTaxonomies } from '../../hooks/useTaxonomies/useTaxonomies'

// UI
import { Details2, OffCanvasContext, Table } from '@drykiss/industry-ui'
import { TaxonomyUpsert, TaxonomyDelete } from '../../forms'

// Types

import { TableProps } from '../types'
import { offCanvasType } from '../../../../types/offCanvas'
import { Taxonomy } from '../../../../types/taxonomy.d'
import { TaxonomyChildTable } from '../../child/table'

import { columns, rows, Toolbar } from './helpers'

export const TaxonomyTable = ({ title, type, clientId }: TableProps) => {
  const { query } = useRouter()
  const offCanvas: offCanvasType = useContext(OffCanvasContext)
  const defaultTab: string | string[] = query.tab || type

  const handleClick = (e: MouseEvent<HTMLElement>, row: Taxonomy) => {
    e.stopPropagation()
    const defaultValues = row ? { ...row, status: row.status.toLowerCase() } : {}
    const pageTitle = defaultTab[0].toUpperCase() + defaultTab.slice(1)

    offCanvas.show({
      content: (
        <TaxonomyUpsert
          onSuccess={handleSuccess}
          defaultValues={{ type: defaultTab, ...defaultValues }}
        />
      ),
      title: `${row ? 'Edit' : 'Add'} ${pageTitle} Category`
    })
  }

  const handleQuestionsClick = (row: Taxonomy) => {
    offCanvas.show({
      content: <TaxonomyChildTable type={defaultTab} parentId={row.id} />,
      submit: false,
      title: 'Custom Field'
    })
  }

  const handleDelete = (row: Taxonomy) => {
    offCanvas.show({
      content: (
        <TaxonomyDelete
          clientId={clientId}
          taxonomyId={row.id}
          type={defaultTab}
          onSuccess={handleSuccess}
        />
      ),
      title: 'Delete Taxonomy',
      submit: false
    })
  }

  const { error, loading, taxonomies } = useTaxonomies({
    category: defaultTab,
    isParent: false,
    clientId: clientId
  })
  console.log(error?.message)
  const handleSuccess = offCanvas.close

  return (
    <Details2 open title={title} toolbar={<Toolbar handleClick={handleClick} />}>
      <Table
        fullHeight
        align
        columns={columns(handleDelete, handleQuestionsClick, handleClick)}
        loading={loading}
        rows={rows(taxonomies)}
      />
    </Details2>
  )
}
