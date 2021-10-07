export const scrollTo = (elementId: string = ''): void => {
  switch (elementId.toLowerCase()) {
    case '':
    case 'top':
    default:
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
  }
}
