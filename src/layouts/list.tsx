/**
 * Layouts -  List
 */

// React
import { useEffect, useState } from 'react'

// Next
import { useRouter } from 'next/router'
// UI
import { Column, Row } from '@drykiss/industry-ui'
import { Filters } from '../filters/filters'

// Types
import { LayoutListProps } from './types.d'
import { prepareFiltersFromQuery } from './helpers'

export const LayoutList = ({
  FiltersComp,
  initialFilters,
  TableComp,
  otherProps
}: LayoutListProps) => {
  const { query } = useRouter()
  const [filters, setFilters] = useState(query)

  useEffect(() => {
    const filters = prepareFiltersFromQuery(query)
    setFilters({ ...initialFilters, ...filters })
  }, [query])

  return (
    <Row>
      <Column sm={12} lg={12}>
        {FiltersComp && (
          <Filters
            initialValues={initialFilters}
            query={query}
            renderFilters={(form: JSX.Element) => {
              return <FiltersComp {...form} {...otherProps} />
            }}
            setFilters={setFilters}
          />
        )}

        <TableComp filters={filters} initialFilters={initialFilters} {...otherProps} />
      </Column>
    </Row>
  )
}
