/**
 * Components - Taxonomy - Forms - CustomFieldForm - CustomFieldForm
 */

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// this component needs to be audited
// React
import { ChangeEvent, Fragment } from 'react'

// React Hook Form
import { useFieldArray, useWatch } from 'react-hook-form'

// UI
import { Checkbox, Column, Input, Label, LazyIcon, Row, Select, Space } from '@drykiss/industry-ui'

// Constants
import { input, inputType } from '@availabletowork/constants'

// Types
import { CustomFieldFormProps } from '@availabletowork/types'

import { customFieldEntityOptions } from './helpers'

export const CustomFieldForm = ({ defaultOptions }: CustomFieldFormProps) => {
  // Watchers
  const inputWatch = useWatch({
    control: defaultOptions.control,
    name: 'custom_fields.input'
  })

  const hasOptions = (): boolean => {
    if (inputWatch) {
      const isOption = input.find((input: { value: string }) => input.value === inputWatch)
      return !!isOption?.hasOptions
    }
    return false
  }

  const withType = inputWatch === 'input'

  const withTime = inputWatch === 'datepicker'

  const { fields, append, remove } = useFieldArray({
    control: defaultOptions.control,
    name: 'custom_fields.options'
  })

  const onChangeLabel = (data: ChangeEvent<HTMLInputElement>, idx: number) => {
    const {
      target: { value = '' }
    } = data
    const { setValue } = defaultOptions?.control || {}
    const makeName = value.toLowerCase().split(' ').join('-')
    setValue(`custom_fields.options[${idx}].value`, makeName)
  }

  return (
    <>
      <Label label="Input">
        <Select {...defaultOptions} name="custom_fields.input" options={input} />
      </Label>

      {inputWatch === 'selectEntity' && (
        <>
          <Label label="Entity">
            <Select
              {...defaultOptions}
              name="custom_fields.inputType"
              options={customFieldEntityOptions}
            />
          </Label>
        </>
      )}

      {withType && (
        <Label label="Type">
          <Select {...defaultOptions} name="custom_fields.inputType" options={inputType} />
        </Label>
      )}

      {withTime && (
        <Checkbox
          {...defaultOptions}
          name="custom_fields.withTime"
          label="With time"
          value={!defaultValues?.userId}
          stacked
        />
      )}

      {hasOptions() && (
        <>
          <Row>
            <Column xs={4} md={4}>
              <Label label="Options" />
            </Column>

            <Column>
              <LazyIcon iconName="plus" onClick={append} />
            </Column>
          </Row>

          {fields.map((field, idx) => (
            <Fragment key={field.id}>
              <Row align="center">
                <Column xs={5} md={5}>
                  <Input
                    {...defaultOptions}
                    defaultValue={field.value}
                    name={`custom_fields.options[${idx}].label`}
                    placeholder="Label"
                    onChange={(data: ChangeEvent<HTMLInputElement>) => onChangeLabel(data, idx)}
                  />
                </Column>

                <Column xs={5} md={5}>
                  <Input
                    {...defaultOptions}
                    defaultValue={field.value}
                    name={`custom_fields.options[${idx}].value`}
                    placeholder="Value"
                  />
                </Column>

                <Column xs={2} md={2}>
                  <LazyIcon iconName="delete" onClick={() => remove(idx)} />
                </Column>
              </Row>

              <Space marginBottom="md" />
            </Fragment>
          ))}
        </>
      )}

      <Checkbox
        {...defaultOptions}
        name="custom_fields.required"
        label="Required"
        value={true}
        stacked
      />
    </>
  )
}
