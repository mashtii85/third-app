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
import { DatePicker } from '../../common/datePicker/datePicker'

// Types
import { CustomFieldRenderProps } from './types.d'

const inputComponents: { [x: string]: Function } = {
  checkbox: Checkbox,
  currencyInput: CurrencyInput,
  datepicker: DatePicker,
  input: FormField,
  radio: RadioField,
  select: SelectField,
  selectEntity: SelectField,
  textArea: TextareaField
}

export const CustomFieldRender = (props: CustomFieldRenderProps) => {
  const {
    control,
    errors,
    input,
    inputType,
    label,
    name,
    options,
    register,
    withTime,
    defaultValue
  } = props
  const hasOptions = (input === 'select' || input === 'selectEntity') && options.length > 0
  const hasCurrencyInput = input === 'currencyInput'
  const hasData = ['checkbox', 'radio'].includes(input) && options.length > 0
  const hasTime = input === 'datepicker' && withTime

  const defaultProps = {
    control,
    ...(hasData && { data: options }),
    ...(hasOptions && {
      options: options.map((opt: Options) => ({ ...opt, text: opt.label }))
    }),
    ...(hasTime && {
      showTimeSelect: true,
      todayButton: false,
      dateFormat: 'd MMM yyyy HH:mm'
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
