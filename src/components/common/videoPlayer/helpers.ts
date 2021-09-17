export const strPadLeft = (string: string, pad: string, length: number): string => {
  return (new Array(length + 1).join(pad) + string).slice(-length)
}
export const numberOfSecondsToTime = (n: number): string => {
  return new Date(n * 1000).toISOString().substr(14, 5)
}
