/**
 * Components - Taxonomy - Custom Field - Table
 */

// React
import { useContext, MouseEvent } from 'react'

// Apollo
import { useTaxonomies } from '../hooks/useTaxonomies'

// UI
import { capitalize, OffCanvasContext, Table, TableActions } from '@drykiss/industry-ui'
import { AddButton } from '../../common/buttons/addButton'
import { TaxonomyForm } from '../form/form'
// Types
import { offCanvasType } from '../../../types/offCanvas'
import { TaxonomyChildTableProps } from './type'
import { Taxonomy } from '../../../types/taxonomy'
export const TaxonomyChildTable = ({ type, parentId }: TaxonomyChildTableProps) => {
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)

  const { loading, taxonomies } = useTaxonomies({ category: type, isParent: true, parentId })

  const handleSuccess = () => {
    offCanvas.close()
  }

  const handleClick = (_: MouseEvent, row?: Taxonomy): void => {
    offCanvas.show({
      title: row?.id ? 'Edit' : 'Add',
      content: (
        <TaxonomyForm
          defaultValues={{ ...row, type, parent_id: parentId }}
          isShowQuestionForm
          onSuccess={handleSuccess}
        />
      )
    })
  }

  const actionsData = () => {
    return [
      {
        context: 'secondary',
        icon: ['fas', 'edit'],
        onClick: (_: MouseEvent, row: Taxonomy) => handleClick(_, row.data),
        tooltip: 'Edit'
      }
    ]
  }

  const columns = [
    {
      hidden: true
    },
    {
      text: 'id',
      hidden: true
    },
    {
      text: 'Name'
    },
    {
      text: 'Taxonomy Status',
      hidden: true
    },
    {
      text: 'Status'
    },
    {
      formatter: TableActions,
      formatterData: actionsData,
      text: 'Actions'
    }
  ]

  const rows = () =>
    taxonomies.map((item: Taxonomy) => {
      return {
        data: item,
        id: item.id,
        name: item.name,
        status: item.status,
        statusText: capitalize(item.status),
        actions: ''
      }
    })

  return (
    <>
      <Table fullHeight align columns={columns} loading={loading} rows={rows()} />

      <AddButton content="Add New" disabled={loading} handleClick={handleClick}>
        <div></div>
      </AddButton>
    </>
  )
}
