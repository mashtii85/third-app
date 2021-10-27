/**
 * Components - Filters
 */

// Next
import { useRouter } from 'next/router'

// React Hook Form
import { useForm } from 'react-hook-form'

// UI
import { Button, Column, Details2, Form, FormLabel, Row, Search } from '@drykiss/industry-ui'
import { AddButton } from '../components/common/buttons/addButton'
import { useEffect } from 'react'
import { nullFreeObject } from '../utils/nullFreeObject'

export const Filters = ({
  initialValues = {},
  query = {},
  renderFilters,
  setFilters,
  lastQuery
}: {
  initialValues: any
  query: any
  renderFilters: (data: any) => JSX.Element
  setFilters: any
  lastQuery?: string
}) => {
  const { q, ...other } = query
  const defaultValues = { ...initialValues, ...other, query: q }
  // nullFreeObject(defaultValues)
  const { control, errors, handleSubmit, register, reset, watch } = useForm({
    defaultValues
  })

  const defaultOptions = {
    control,
    errors,
    register
  }

  // useFrom cache defaultValues, we need to manually reset it
  useEffect(() => {
    reset(defaultValues)
  }, [query])

  const { push } = useRouter()

  const handleSearch = (data: any) => {
    const q = data.query
    delete data.query
    const filters = data

    if (q !== lastQuery) {
      filters.q = q.length > 0 ? `%${q}%` : '%'

      const queryIsNumber = /^\d+$/.test(q)

      if ('id' in initialValues) {
        filters.id = queryIsNumber ? Number(q) : null
      }

      if (filters.id || filters.meta) {
        filters.q = null
      }

      const { taxonomy, ...queryStringer } = data
      queryStringer.q = q

      nullFreeObject(queryStringer)

      if (q === '') {
        delete queryStringer.q
      }

      if (taxonomy) {
        queryStringer.type = taxonomy.value
      }

      push({ query: queryStringer })
      setFilters({ ...initialValues, ...data, ...filters })
    }
  }

  const resetFilters = () => {
    setFilters(initialValues)
    push({ query: '' })
    reset(initialValues)
    handleSearch('')
  }

  return (
    <Form handleSubmit={handleSubmit(handleSearch)}>
      <Details2 title="Filters">
        <Row>
          <Column sm={4} lg={4}>
            <FormLabel label="Search" context="primary">
              <Search
                label="Search"
                name="query"
                placeholder="Search..."
                prependSearchIcon
                type="search"
                {...defaultOptions}
              />
            </FormLabel>
          </Column>

          {renderFilters({
            control,
            errors,
            initialValues,
            register,
            setFilters,
            watch
          })}
        </Row>

        <AddButton content="Search" context="secondary" handleClick={handleSearch} type="submit">
          <Button content="Reset filters" context="danger" onClick={resetFilters} size="sm" />
        </AddButton>
      </Details2>
    </Form>
  )
}
// (prevProps, nextProps) => {
//   console.log(prevProps, nextProps)
//   return true
// }
