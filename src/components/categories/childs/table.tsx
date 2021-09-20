/**
 * Components - Taxonomy - Custom Field - Table
 */

// React
import { useContext } from 'react'

// Apollo
import { useQuery } from '@apollo/client'
import { GET_TAXONOMIES } from '../queries'

// UI
import { capitalize, OffCanvasContext, Table, TableActions } from '@drykiss/industry-ui'
import { AddButton } from '../../common/buttons/addButton'
import { TaxonomyForm } from '../form/form'

// Types
import { offCanvasType } from '../../../types/offCanvas.d'
import { Taxonomy } from '../../../types/taxonomy.d'

// to do: I add parameter in here

export const TaxonomyChildTable = ({ defaultValues }: { defaultValues: Taxonomy }) => {
  console.log(defaultValues)

  const offCanvas = useContext<offCanvasType>(OffCanvasContext)

  const queryVariables = {}

  const {
    data: { taxonomies } = {
      taxonomies: []
    },
    loading
  } = useQuery(GET_TAXONOMIES, {
    variables: queryVariables
  })

  const handleClick = (e: any, row: any) => {
    console.log(e)
    offCanvas.show({
      title: row?.id ? 'Edit' : 'Add',
      content: <TaxonomyForm defaultValues={row} type="custom-field" onSuccess={offCanvas.close} />
    })
  }

  const actionsData = (row: any) => {
    const isReadOnly = row.data.meta?.isSystem
    return [
      {
        context: 'secondary',
        disabled: isReadOnly,
        icon: ['fas', 'edit'],
        onClick: (e: any, row: any) => {
          console.log(e)
          handleClick('edit', row.data)
        },
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
    taxonomies.map((item: any) => {
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

      <AddButton
        content="Add New"
        disabled={loading}
        handleClick={(data) => handleClick('add', data)}
      >
        <div></div>
      </AddButton>
    </>
  )
}
