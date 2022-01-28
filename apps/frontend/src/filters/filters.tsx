/**
 * Components - Filters
 */

// React Hook Form
import { useForm } from 'react-hook-form'

// UI
import { Button, Column, Details, Form, Label, Row, Search } from '@drykiss/industry-ui'
import { AddButton } from '../components/common/buttons/addButton'
import { useEffect } from 'react'
import { nullFreeObject } from '../utils/nullFreeObject'
import { historyPush } from '../utils/historyPush'

// Hooks
import { useWatcher } from '../components/locations/list/useWatcher'

// Constants
import { STATUS_ACTIVE } from '@availabletowork/constants'

// Types
import { LooseObject } from '@availabletowork/types'

export const Filters = ({
  initialValues = {},
  query = {},
  renderFilters,
  setFilters,
  lastQuery,
  ...otherValues
}: {
  initialValues: any
  query: any
  renderFilters: (data: any) => JSX.Element
  setFilters: any
  lastQuery?: string
}) => {
  const defaultValues = { ...otherValues, query: query.q }

  const {
    control,
    getValues,
    formState: { errors = {} },
    handleSubmit,
    register,
    reset,
    watch
  } = useForm({
    defaultValues
  })
  const defaultOptions = {
    control,
    errors,
    register,
    showError: true
  }

  // useFrom cache defaultValues, we need to manually reset it
  useEffect(() => {
    reset(defaultValues)
  }, [query])

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
        queryStringer.q = null
      }

      if (taxonomy) {
        queryStringer.type = taxonomy.value
      }

      if (queryStringer.status === STATUS_ACTIVE.Active) {
        delete queryStringer.status
      }
      historyPush(queryStringer)
      setFilters({ ...initialValues, ...data, ...filters })
    }
  }

  const resetFilters = () => {
    setFilters(initialValues)
    const values: LooseObject = getValues()
    delete values.taxonomy
    delete values.query
    const query: LooseObject = {}
    Object.keys(values).forEach((item) => {
      query[item] = undefined
    })
    historyPush({ q: undefined, type: undefined, ...query })
    reset(initialValues)
    handleSearch('')
  }

  // watcher
  useWatcher(setFilters, watch, getValues())

  return (
    <Form handleSubmit={handleSubmit(handleSearch)}>
      <Details title="Filters" open={Object.keys(defaultValues).length > 0}>
        <Row>
          <Column sm={4} lg={4}>
            <Label label="Search" context="primary">
              <Search
                label="Search"
                name="query"
                placeholder="Search..."
                prependSearchIcon
                type="search"
                {...defaultOptions}
              />
            </Label>
          </Column>

          {renderFilters({
            control,
            errors,
            initialValues: defaultValues,
            register,
            setFilters,
            watch
          })}
        </Row>
        <AddButton type={'submit'} content="Search" context="secondary" handleClick={handleSearch}>
          <Button content="Reset filters" context="danger" onClick={resetFilters} size="sm" />
        </AddButton>
      </Details>
    </Form>
  )
}
