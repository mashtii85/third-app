/**
 * Components - Taxonomy - Questions
 */
// UI
import {
  camelCase,
  Checkbox,
  CurrencyInput,
  FormField,
  FormLabel,
  RadioField,
  SelectField,
  TextareaField
} from '@drykiss/industry-ui'
import { Options } from '../../../types/options'

import { DatePicker } from '../../calendar/datePicker'
import { CustomFieldRenderProps } from './types'

const inputComponents: { [x: string]: Function } = {
  checkbox: Checkbox,
  currencyInput: CurrencyInput,
  datepicker: DatePicker,
  input: FormField,
  radio: RadioField,
  select: SelectField,
  textArea: TextareaField
}

export const CustomFieldRender = (props: CustomFieldRenderProps) => {
  const { control, errors, input, inputType, label, name, options, register, defaultValue } = props
  const hasOptions = input === 'select' && options.length > 0
  const hasCurrencyInput = input === 'currencyInput'
  const hasData = ['checkbox', 'radio'].includes(input) && options.length > 0

  const defaultProps = {
    control,
    ...(hasData && { data: options }),
    ...(hasOptions && {
      options: options.map((opt: Options) => ({ ...opt, text: opt.label }))
    }),
    errors,
    defaultValue,
    label: camelCase.camelize(label || ''),
    name,
    register: register,
    type: input === 'input' ? inputType : input
  }

  const InputComponent = inputComponents[input]

  if (!inputComponents) return null

  return (
    <>
      {hasCurrencyInput ? (
        <FormLabel label={label}>
          <InputComponent {...defaultProps} label="" />
        </FormLabel>
      ) : (
        <FormLabel label={label}>
          <InputComponent {...defaultProps} />
        </FormLabel>
      )}
    </>
  )
}
