/**
 * Components - Taxonomy - Custom Field - Table
 */

// React
import { useContext, MouseEvent } from 'react'

// Apollo
import { useTaxonomies } from '../hooks/useTaxonomies/useTaxonomies'

// UI
import { OffCanvasContext, Table } from '@drykiss/industry-ui'
import { AddButton } from '../../common/buttons/addButton'
import { TaxonomyUpsert } from '../forms'
// Types
import { offCanvasType } from '../../../types/offCanvas'
import { TaxonomyChildTableProps } from './type'
import { Taxonomy } from '../../../types/taxonomy.d'
import { STATUS_ACTIVE } from '../../../types/select.d'
// Helpers
import { columns, prepareTaxonomiesVariable, rows } from './helpers'

export const TaxonomyChildTable = (childTableProps: TaxonomyChildTableProps) => {
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)

  const taxonomiesVariable = prepareTaxonomiesVariable(childTableProps)

  const { loading, taxonomies } = useTaxonomies(taxonomiesVariable)

  const handleClick = (_: MouseEvent<HTMLElement>, row?: Taxonomy): void => {
    const defaultValues = {
      ...row,
      entity: childTableProps.entity,
      entity_id: childTableProps.entityId,
      type: childTableProps.type,
      parent_id: childTableProps.parentId,
      status: STATUS_ACTIVE.Active
    }

    offCanvas.show({
      title: row?.id ? 'Edit' : 'Add',
      content: (
        <TaxonomyUpsert
          defaultValues={defaultValues}
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
