export const scrollTo = (elementId: string = '') => {
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
