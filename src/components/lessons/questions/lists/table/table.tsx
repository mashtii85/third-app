/**
 * Components - Lessons - Questions - Lists - Table
 */

// React
import { useContext, MouseEvent } from 'react'

// Apollo
import { useTaxonomies } from '../../../../taxonomies/hooks'

// UI
import { capitalize, OffCanvasContext, Table, TableActions } from '@drykiss/industry-ui'
import { AddButton } from '../../../../common/buttons/addButton'
import { LessonQuestionForm } from '../../form/create/form'
import { LessonQuestionDeleteForm } from '../../form/delete/delete'

// Types
import { offCanvasType } from '../../../../../types/offCanvas'
import { LessonQuestionTableProps } from './type.d'
import { Taxonomy } from '../../../../../types/taxonomy.d'
import { UseTaxonomiesVariable } from '../../../../taxonomies/hooks/useTaxonomies/types'
import { STATUS_ACTIVE } from '../../../../../types/select'

export const LessonQuestionsTable = (tableProps: LessonQuestionTableProps) => {
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)

  const taxonomiesVariable: UseTaxonomiesVariable = {
    category: tableProps.type,
    entity: tableProps.entity,
    entityId: tableProps.entityId
  }
  const { loading, taxonomies } = useTaxonomies(taxonomiesVariable)

  const handleSuccess = () => {
    offCanvas.close()
  }

  const handleClick = (_: MouseEvent, row?: Taxonomy): void => {
    offCanvas.show({
      title: row?.id ? 'Edit' : 'Add',
      content: (
        <LessonQuestionForm
          defaultValues={{
            ...row,
            entity: tableProps.entity,
            entity_id: tableProps.entityId,
            type: tableProps.type,
            status: STATUS_ACTIVE.Active
          }}
          isShowQuestionForm
          onSuccess={handleSuccess}
        />
      )
    })
  }

  const handleDelete = (_: MouseEvent, row?: Taxonomy): void => {
    offCanvas.show({
      content: (
        <LessonQuestionDeleteForm
          taxonomyId={row?.id}
          type={row?.type}
          entity={tableProps.entity}
          entityId={tableProps.entityId}
          onSuccess={handleSuccess}
        />
      ),
      title: 'Delete Taxonomy',
      submit: false
    })
  }

  const actionsData = () => {
    const buttons = [
      {
        context: 'secondary',
        icon: ['fas', 'edit'],
        onClick: (_: MouseEvent, row: Taxonomy) => handleClick(_, row.data),
        tooltip: 'Edit'
      },
      {
        context: 'danger',
        icon: ['fas', 'trash'],
        onClick: (_: MouseEvent, row: Taxonomy) => handleDelete(_, row.data),
        tooltip: 'Delete'
      }
    ]
    return buttons
  }

  const columns = [
    { text: 'data', hidden: true },
    { text: 'id', hidden: true },
    { text: 'Name' },
    { text: 'Taxonomy Status', hidden: true },
    { text: 'Status' },
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
      <AddButton content="Add New" disabled={loading} handleClick={handleClick} />
    </>
  )
}
