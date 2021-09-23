/**
 * Components - Taxonomy - List - Table
 */
// React
import { useContext, MouseEvent } from 'react'
// UI
import {
  Button,
  ButtonToolbar,
  capitalize,
  Details2,
  OffCanvasContext,
  Table,
  TableActions
} from '@drykiss/industry-ui'
import { TaxonomyForm } from '../form/form'
import { TaxonomyDelete } from '../module/delete'
// Next
import { useRouter } from 'next/router'
// Apollo
import { useTaxonomies } from '../hooks/useTaxonomies'
// Types
import { Column, FormatterData } from '../../../types/column'
import { TableProps } from './types'
import { offCanvasType } from '../../../types/offCanvas'
import { Taxonomy } from '../../../types/taxonomy'
import { TaxonomyChildTable } from '../child/table'

import { TAXONOMY_TABS } from '../../../constants/tabs'

export const TaxonomyTable = ({ title }: TableProps) => {
  const { query } = useRouter()
  const offCanvas: offCanvasType = useContext(OffCanvasContext)
  const defaultTab: string | string[] = query.tab || TAXONOMY_TABS.COURSE_TYPES
  const handleClick = (e: MouseEvent<HTMLElement>, row: Taxonomy) => {
    e.stopPropagation()
    const defaultValues = row ? { ...row, status: row.status.toLowerCase() } : {}
    const pageTitle = defaultTab[0].toUpperCase() + defaultTab.slice(1)
    offCanvas.show({
      content: (
        <TaxonomyForm
          onSuccess={handleSuccess}
          defaultValues={{ type: defaultTab, ...defaultValues }}
        />
      ),
      title: `${row ? 'Edit' : 'Add'} ${pageTitle} Category`
    })
  }

  const formatterData: FormatterData<Taxonomy>[] = [
    {
      context: 'secondary',
      icon: ['fas', 'edit'],
      onClick: handleClick,
      tooltip: 'Edit'
    },
    {
      context: 'danger',
      icon: ['fas', 'trash'],
      onClick: (_e: MouseEvent<HTMLElement>, row: Taxonomy) => handleDelete(row),
      tooltip: 'Delete'
    },
    {
      context: 'info',
      icon: ['fas', 'question'],
      onClick: (_e: MouseEvent<HTMLElement>, row: Taxonomy) => handleQuestionsClick(row),
      tooltip: 'Custom Fields'
    }
  ]

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
      formatterData: formatterData,
      text: 'Actions'
    },
    { hidden: true }
  ]

  const handleQuestionsClick = (row: Taxonomy) => {
    offCanvas.show({
      content: <TaxonomyChildTable type={defaultTab} parentId={row.id} />,
      submit: false,
      title: 'Custom Field'
    })
  }

  const handleDelete = (row: Taxonomy) => {
    offCanvas.show({
      content: <TaxonomyDelete taxonomyId={row.id} type={defaultTab} onSuccess={handleSuccess} />,
      title: 'Delete Taxonomy',
      submit: false
    })
  }

  const { loading, taxonomies } = useTaxonomies({ category: defaultTab, isParent: false })
  const handleSuccess = () => {
    offCanvas.close()
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

  const Toolbar = () => {
    return (
      <ButtonToolbar>
        <Button context="secondary" onClick={handleClick}>
          Add New
        </Button>
      </ButtonToolbar>
    )
  }

  return (
    <Details2 open title={title} toolbar={<Toolbar />}>
      <Table fullHeight align columns={columns} loading={loading} rows={rows()} />
    </Details2>
  )
}
