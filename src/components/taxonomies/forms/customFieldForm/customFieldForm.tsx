/**
 * Components - Taxonomy - Forms - CustomFieldForm - CustomFieldForm
 */

// React
import { ChangeEvent, Fragment } from 'react'

// React Hook Form
import { useFieldArray, useWatch } from 'react-hook-form'

// UI
import {
  Checkbox,
  Column,
  FormField,
  FormLabel,
  LazyIcon,
  Row,
  SelectField,
  Space
} from '@drykiss/industry-ui'

import { input, inputType } from '../../../../constants/inputTypes'
import { CustomFieldFormProps } from './types.d'

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
      <FormLabel label="Input">
        <SelectField {...defaultOptions} name="custom_fields.input" options={input} />
      </FormLabel>

      {withType && (
        <FormLabel label="Type">
          <SelectField {...defaultOptions} name="custom_fields.inputType" options={inputType} />
        </FormLabel>
      )}

      {withTime && (
        <Checkbox
          {...defaultOptions}
          name="custom_fields.withTime"
          data={[{ label: 'With time' }]}
          stacked
        />
      )}

      {hasOptions() && (
        <>
          <Row>
            <Column xs={4} md={4}>
              <FormLabel label="Options" />
            </Column>

            <Column>
              <LazyIcon iconName="plus" onClick={append} />
            </Column>
          </Row>

          {fields.map((field, idx) => (
            <Fragment key={field.id}>
              <Row align="center">
                <Column xs={5} md={5}>
                  <FormField
                    {...defaultOptions}
                    defaultValue={field.value}
                    name={`custom_fields.options[${idx}].label`}
                    placeholder="Label"
                    onChange={(data: ChangeEvent<HTMLInputElement>) => onChangeLabel(data, idx)}
                  />
                </Column>

                <Column xs={5} md={5}>
                  <FormField
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
        data={[{ label: 'Required', value: true }]}
        stacked
      />
    </>
  )
}
