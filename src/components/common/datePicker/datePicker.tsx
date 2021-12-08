/**
 * Components - Common - DatePicker
 */

// UI
import { DatePickerCalendar, Space } from '@drykiss/industry-ui'

// Date FNS
import enGB from 'date-fns/locale/en-GB'

// Constants
import { SIZE } from '../../../config/theme'

// Types
import { DatePickerProps } from './types.d'

export const DatePicker = ({
  name,
  control,
  errors,
  register,
  todayButton,
  space,
  ...props
}: Partial<DatePickerProps>) => {
  return (
    <>
      <DatePickerCalendar
        name={name}
        control={control}
        errors={errors}
        register={register}
        locale={enGB}
        todayButton={todayButton ?? false}
        {...props}
      />
      {(space ?? true) && <Space marginBottom={SIZE.SM} />}
    </>
  )
}
