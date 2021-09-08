/**
 * Layouts -  List
 */

// React
import { useState } from 'react'

// UI
import { Column, Row } from '@drykiss/industry-ui'
import { Filters } from '../filters/filters'

// Types
import { LayoutListProps } from './types.d'

export const LayoutList = ({
  FiltersComp,
  initialFilters,
  TableComp,
  otherProps
}: LayoutListProps) => {
  const [filters, setFilters] = useState(initialFilters)

  return (
    <Row>
      <Column sm={12} lg={12}>
        <Filters
          initialValues={initialFilters}
          renderFilters={(form: JSX.Element) => <FiltersComp {...form} {...otherProps} />}
          setFilters={setFilters}
        />

        <TableComp filters={filters} initialFilters={initialFilters} {...otherProps} />
      </Column>
    </Row>
  )
}
