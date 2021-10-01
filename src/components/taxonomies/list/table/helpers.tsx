/**
 * Components - Taxonomy - List - Table - Helpers
 */

// React
import { MouseEvent } from 'react'

// UI
import { Button, ButtonToolbar, capitalize, TableActions } from '@drykiss/industry-ui'

// Types
import { Column, FormatterData } from '../../../../types/column'
import { Taxonomy } from '../../../../types/taxonomy'

export const formatterData = (
  handleDelete: (row: Taxonomy) => void,
  handleQuestionsClick: (row: Taxonomy) => void,
  handleClick: (e: MouseEvent<HTMLElement>, row: Taxonomy) => void
): FormatterData<Taxonomy>[] => [
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
export const columns = (
  handleDelete: (row: Taxonomy) => void,
  handleQuestionsClick: (row: Taxonomy) => void,
  handleClick: (e: MouseEvent<HTMLElement>, row: Taxonomy) => void
): Column<Taxonomy>[] => [
    {
      text: 'Name'
    },
    {
      text: 'Status'
    },
    {
      hidden: false,
      formatter: TableActions,
      formatterData: formatterData(handleDelete, handleQuestionsClick, handleClick),
      text: 'Actions'
    },
    { hidden: true }
  ]

export const rows = (taxonomies: Taxonomy[]) =>
  taxonomies.map((item) => {
    return {
      name: item.name,
      status: capitalize(item.status),
      actions: '',
      id: item.id
    }
  })

export const Toolbar = ({
  handleClick
}: {
  handleClick: (e: MouseEvent<HTMLElement>, row: Taxonomy) => void
}) => {
  return (
    <ButtonToolbar>
      <Button context="secondary" onClick={handleClick}>
        Add New
      </Button>
    </ButtonToolbar>
  )
}
