/**
 * Components - Taxonomy - Custom Field - Table
 */

// React
import { useContext, MouseEvent } from 'react'

// Apollo
import { useTaxonomies } from '../hooks/useTaxonomies'

// UI
import { OffCanvasContext, Table } from '@drykiss/industry-ui'
import { AddButton } from '../../common/buttons/addButton'
import { TaxonomyForm } from '../form/form'
// Types
import { offCanvasType } from '../../../types/offCanvas'
import { TaxonomyChildTableProps } from './type.d'
import { Taxonomy, TAXONOMY_STATUS } from '../../../types/taxonomy.d'
// Helpers
import { columns, prepareTaxonomiesVariable, rows } from './helpers'

export const TaxonomyChildTable = (childTableProps: TaxonomyChildTableProps) => {
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)

  const taxonomiesVariable = prepareTaxonomiesVariable(childTableProps)

  const { loading, taxonomies } = useTaxonomies(taxonomiesVariable)

  const handleClick = (_: MouseEvent<HTMLElement>, row?: Taxonomy): void => {
    offCanvas.show({
      title: row?.id ? 'Edit' : 'Add',
      content: (
        <TaxonomyForm
          defaultValues={{
            ...row,
            entity: childTableProps.entity,
            entity_id: childTableProps.entityId,
            type: childTableProps.type,
            parent_id: childTableProps.parentId,
            status: TAXONOMY_STATUS.Active
          }}
          isShowQuestionForm
          onSuccess={offCanvas.close}
        />
      )
    })
  }

  return (
    <>
      <Table
        fullHeight
        align
        columns={columns(handleClick)}
        loading={loading}
        rows={rows(taxonomies)}
      />
      <AddButton content="Add New" disabled={loading} handleClick={handleClick} />
    </>
  )
}
