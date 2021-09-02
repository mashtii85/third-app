/**
 * Components - Selects - Select
 */

// React
import { memo } from 'react'

// Apollo
// import { useApolloClient } from '@apollo/client'

// UI
import { debounce, FormLabel, ReactSelectField } from '@drykiss/industry-ui'

// Types
import { GetQueryTypeInput, GetQueryTypeOutput, SelectProps, SELECT_TYPE } from './types.d'

const checkProps = (prevProps: any, nextProps: any) => {
  const items = ['accountId', 'entity', 'entityId', 'locationId', 'type']
  let propsEqual = true

  const prevError = prevProps.errors[prevProps.name]?.message
  const nextError = nextProps.errors[nextProps.name]?.message

  // Check if there's a new error or the error is gone
  if (prevError !== nextError) {
    propsEqual = false
  }

  items.forEach((item) => {
    if (prevProps[item] !== nextProps[item]) {
      propsEqual = false
    }
  })

  return propsEqual
}

const getQuery = ({ type }: GetQueryTypeInput): GetQueryTypeOutput => {
  switch (type) {
    case SELECT_TYPE.COURSES:
      return {
        query: '',
        variables: {
          entity: '',
          entityId: 0
        }
      }

    default:
      return {
        query: '',
        variables: {
          entity: '',
          entityId: 0
        }
      }
  }
}

export const Select = memo(
  ({
    control,
    defaultValue,
    errors,
    entity,
    entityId,
    isClearable,
    label,
    name,
    type,
    ...props
  }: SelectProps) => {
    // const client = useApolloClient()

    const getOptions = debounce(async (q: string, callback: () => void) => {
      const { query, variables = {} } = getQuery({
        entity,
        entityId,
        type
      })
      console.log(query, variables, q, callback())
      // const queryIsNumber = /^\d+$/.test(q)
      // const { data: { items } = { items: [] } } = await client.query({
      //   query,
      //   variables: {
      //     q: q ? (queryIsNumber ? Number(q) : `%${q}%`) : null,
      //     ...variables
      //   }
      // })

      // callback(items)
    }, 200)
    return (
      <FormLabel id={name} label={label}>
        <ReactSelectField
          async
          cacheOptions
          control={control}
          defaultOptions
          errors={errors}
          isClearable={isClearable}
          key={defaultValue}
          loadOptions={getOptions}
          name={name}
          {...props}
        />
      </FormLabel>
    )
  },
  checkProps
)
