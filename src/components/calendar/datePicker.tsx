/**
 * Components - Calendar - Date Picker
 */
// TODO: need to implement type in this file
// Date FNS
import enGB from 'date-fns/locale/en-GB'

// UI
import { DatePickerCalendar, Space } from '@drykiss/industry-ui'
import { SIZE } from '../../config/theme'

export const DatePicker = ({ control, errors, name, space, ...props }: any) => {
  return (
    <>
      <DatePickerCalendar control={control} errors={errors} locale={enGB} name={name} {...props} />
      {space && <Space marginBottom={SIZE.SM} />}
    </>
  )
}
