/**
 * Components - Taxonomy - Custom Field - Helpers
 */

// React
import { MouseEvent } from 'react'

// UI
import { capitalize, TableActions } from '@drykiss/industry-ui'

// Types
import { Taxonomy, TaxonomyChildTableProps, TaxonomyFilters } from '@availabletowork/types'

// Constants
import { THEME_CONTEXT } from '@availabletowork/types'

const actionsData = (handleClick: (_: MouseEvent<HTMLElement>, row?: Taxonomy) => void) => {
  const buttons = [
    {
      context: THEME_CONTEXT.secondary,
      icon: ['fas', 'edit'],
      onClick: (_: MouseEvent<HTMLElement>, row: Taxonomy) => handleClick(_, row.data),
      tooltip: 'Edit'
    }
  ]
  return buttons
}

export const columns = (handleClick: (_: MouseEvent<HTMLElement>, row?: Taxonomy) => void) => [
  { text: 'data', hidden: true },
  { text: 'id', hidden: true },
  { text: 'Name' },
  { text: 'Taxonomy Status', hidden: true },
  { text: 'Status' },
  {
    formatter: TableActions,
    formatterData: actionsData(handleClick),
    text: 'Actions'
  }
]

export const rows = (taxonomies: Taxonomy[]) =>
  taxonomies.map((item) => {
    return {
      data: item,
      id: item.id,
      name: item.name,
      status: item.status,
      statusText: capitalize(item.status),
      actions: ''
    }
  })

export const prepareTaxonomiesVariable = (props: TaxonomyChildTableProps): TaxonomyFilters => ({
  type: props.type,
  entity: props.entity,
  entityId: props.entityId,
  parentId: props.parentId,
  isParent: true
})
