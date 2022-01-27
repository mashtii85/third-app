/**
 * Components - Taxonomy - Questions
 */

// UI
import {
  camelCase,
  Checkbox,
  Currency,
  Input,
  Label,
  Radio,
  Select,
  Textarea
} from '@drykiss/industry-ui'

import { DatePicker } from '../../common/datePicker/datePicker'
import { CustomSelect } from '../../selects/select'

// Types
import { CustomFieldRenderProps, Options } from '@availabletowork/types'

const inputComponents: { [x: string]: (val: any) => JSX.Element } = {
  checkbox: Checkbox,
  Currency: Currency,
  datepicker: DatePicker,
  input: Input,
  radio: Radio,
  select: Select,
  selectEntity: Select,
  textArea: Textarea
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
  const hasOptions = input === 'select' && options.length > 0
  const hasCurrency = input === 'Currency'
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
      {input === 'selectEntity' ? (
        <CustomSelect
          {...defaultProps}
          entity={inputType}
          name={name}
          label={label}
          isClearable={true}
          defaultValue={defaultValue}
        />
      ) : hasCurrency ? (
        <Label label={label}>
          <InputComponent {...defaultProps} label="" />
        </Label>
      ) : (
        <Label label={label}>
          <InputComponent {...defaultProps} />
        </Label>
      )}
    </>
  )
}
