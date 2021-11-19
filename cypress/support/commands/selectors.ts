/**
 * Cypress - Commands - Selectors
 */

const dataCy = (value: string): any => cy.get(`[data-cy=${value}]`)

const id = (value: string): any => cy.get(`[id=${value}]`)

const getNavItem = (name: string): any => cy.contains(`nav div ul li a span`, name)

const getInputByName = (name: string): any => cy.get(`input[name="${name}"]`)

const getTableInModule = (element: string = 'summary', moduleName: string): any =>
  cy.contains(element, moduleName).siblings().eq(0).get('table')
const getTab = (tabName: string, contains: string, element: string = 'details'): any => {
  cy.dataCy(`${tabName}Tab`).click()
  cy.dataCy('loadingIndicator').should('not.exist')

  contains && cy.get(element).contains(contains)
  cy.dataCy('loadingIndicator').should('not.exist')
}

export { dataCy, getInputByName, getNavItem, getTab, getTableInModule, id }
