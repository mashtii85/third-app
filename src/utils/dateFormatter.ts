export const formatToValidDate = (data: any): any => {
  // TODO: it's not a good way, but "RangeError: Invalid time value" issue solved
  const result: any = {}
  if (data === null) return {}
  const isValid = (date: any = {}): boolean => isNaN(date)

  const isNumber = (value: string): boolean => /^[-]?\d+$/.test(value)

  Object.keys(data).forEach((item: any) => {
    if (isNumber(data[item])) {
      result[item] = data[item]
    } else if (!isValid(new Date(data[item]))) {
      result[item] = new Date(data[item])
    } else {
      result[item] = data[item]
    }
  })
  return result
}
