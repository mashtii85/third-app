/**
 * Components - Filters
 */

// React
import { memo } from 'react'

// React Hook Form
import { useForm } from 'react-hook-form'

// UI
import { Button, Column, Details, Form, FormLabel, Row, Search } from '@drykiss/industry-ui'
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
        filters.q = `%${q}%` || '%'

        // If search value is a number, set it as id for Job Id and Invoice Id search
        const queryIsNumber = /^\d+$/.test(q)

        if ('id' in initialValues) {
          filters.id = queryIsNumber ? Number(q) : null
        }
        if ('meta' in initialValues) {
          filters.meta = queryIsNumber
            ? {
                invoiceNumber: Number(q)
              }
            : null
        }

        if (filters.id || filters.meta) {
          filters.q = null
        }

        setFilters({ ...data, ...filters })
      }
    }

    const resetFilters = () => {
      setFilters(initialValues)
      reset(initialValues)
      handleSearch('')
    }

    return (
      <Form handleSubmit={handleSubmit(handleSearch)}>
        <Details summary="Filters">
          <Row>
            <Column sm={12} lg={12}>
              <FormLabel label="">
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

            <Column sm={12} lg={12}>
              {renderFilters({
                control,
                errors,
                initialValues,
                register,
                setFilters
              })}
            </Column>
          </Row>

          <AddButton content="Search" context="secondary" handleClick={handleSearch} type="submit">
            <Button content="Reset filters" context="danger" onClick={resetFilters} size="sm" />
          </AddButton>
        </Details>
      </Form>
    )
  },
  (prevProps, nextProps) => {
    console.log(prevProps, nextProps)
    return true
  }
)
