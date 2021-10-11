/**
 * Components - Filters
 */

// React
import { memo } from 'react'

// React Hook Form
import { useForm } from 'react-hook-form'

// UI
import { Button, Column, Details2, Form, FormLabel, Row, Search } from '@drykiss/industry-ui'
import { AddButton } from '../components/common/buttons/addButton'

export const Filters = memo(
  ({
    initialValues = {},
    renderFilters,
    setFilters,
    lastQuery
  }: {
    initialValues: any
    renderFilters: (data: any) => JSX.Element
    setFilters: any
    lastQuery?: string
  }) => {
    const { control, errors, handleSubmit, register, reset } = useForm({
      defaultValues: initialValues
    })

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

        setFilters({ ...initialValues, ...data, ...filters })
      }
    }

    const resetFilters = () => {
      setFilters(initialValues)
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
                  errors={errors}
                  label="Search"
                  name="email"
                  placeholder="Search..."
                  prependSearchIcon
                  register={register}
                  type="search"
                />
              </FormLabel>
            </Column>

            {renderFilters({
              control,
              errors,
              initialValues,
              register,
              setFilters
            })}
          </Row>

          <AddButton content="Search" context="secondary" handleClick={handleSearch} type="submit">
            <Button content="Reset filters" context="danger" onClick={resetFilters} size="sm" />
          </AddButton>
        </Details2>
      </Form>
    )
  },
  (prevProps, nextProps) => {
    console.log(prevProps, nextProps)
    return true
  }
)
