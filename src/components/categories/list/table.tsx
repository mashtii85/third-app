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
import { useQuery } from '@apollo/client'
import { GET_TAXONOMIES } from '../queries'
// Types
import { Column, FormatterData } from '../../../types/column'
import { TableProps } from './types'
import { offCanvasType } from '../../../types/offCanvas'
import { Taxonomy } from '../../../types/taxonomy'
import { TaxonomyChildTable } from '../childs/table'

export const TaxonomyTable = ({ title }: TableProps) => {
  const { query } = useRouter()
  const offCanvas: offCanvasType = useContext(OffCanvasContext)
  const defaultTab: string | string[] = query.tab || 'course-categories'

  const handleClick = (e: MouseEvent<HTMLElement>, row: Taxonomy) => {
    // TODO:  need to find a way to provide entity_id and client_id
    e.stopPropagation()
    const defaultValues = row ? { ...row, status: row.status.toLowerCase() } : {}

    offCanvas.show({
      content: (
        <TaxonomyForm
          onSuccess={handleSuccess}
          defaultValues={{ type: defaultTab, ...defaultValues }}
        />
      ),
      title: `${row ? 'Edit' : 'Add'} Course Category`
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
    }
  ]

  if (defaultTab === 'account-categories') {
    formatterData.push({
      context: 'info',
      icon: ['fas', 'question'],
      numberOverlay: 'childCount',
      onClick: (_e: MouseEvent<HTMLElement>, row: Taxonomy) => handleQuestionsClick(row),
      tooltip: 'Custom Fields'
    })
  }
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

  const handleQuestionsClick = (row: any) => {
    offCanvas.show({
      content: <TaxonomyChildTable defaultValues={row} />,
      submit: false,
      title: 'Questions'
    })
  }

  const handleDelete = (row: Taxonomy) => {
    offCanvas.show({
      content: <TaxonomyDelete taxonomyId={row.id} type={defaultTab} onSuccess={handleSuccess} />,
      title: 'Delete Taxonomy',
      submit: false
    })
  }

  // const handleDeleteSuccess = offCanvas.close

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

  const handleSuccess = offCanvas.close

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
