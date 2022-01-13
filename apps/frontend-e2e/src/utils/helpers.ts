import { timer } from '../constants/misc'

const openOffCanvas = (moduleName: string, button: number): any => {
  cy.getTableInModule(moduleName)
    .find('tbody')
    .children()
    .eq(0)

    .find('button')
    .children()
    .eq(button)
    .wait(timer)
    .click()
}

export { openOffCanvas }
