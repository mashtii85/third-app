export const formatToValidDate = (data: any): any => {
  // TODO: it's not a good way, but "RangeError: Invalid time value" issue solved
  const result: any = {}
  if (data === null) return {}
  const isValid = (date: any = {}): boolean => isNaN(date)

  Object.keys(data).forEach((item: any) => {
    if (!isValid(new Date(data[item]))) {
      result[item] = new Date(data[item])
    } else {
      result[item] = data[item]
    }
  })
  return result
}
