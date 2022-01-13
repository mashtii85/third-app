/**
 * Cypress - Commands - Selectors
 */

const dataCy = (value: string): any => cy.get(`[data-cy=${value}]`)

const id = (value: string): any => cy.get(`[id=${value}]`)

const getNavItem = (name: string): any => cy.contains(`nav div ul li a span`, name)

const getDropdownNavItem = (item: string, itemList: string[] = [], timer = 1000): any => {
  cy.get('.dropdown--toggle')
    .within(() => {
      cy.contains('span', item)
        .click()
        .get('.dropdown--menu')

        .within(() => {
          cy.get('.dropdown--link')
          itemList.map((item) => cy.get(item))
        })
    })
    .wait(timer)
}

const getInputByName = (name: string): any => cy.get(`input[name="${name}"]`)

const getTableInModule = (element = 'summary', moduleName: string): any =>
  cy.contains(element, moduleName).siblings().eq(0).get('table')
const getTab = (tabName: string, contains: string, element = 'details'): any => {
  cy.dataCy(`${tabName}Tab`).click()
  cy.dataCy('loadingIndicator').should('not.exist')

  contains && cy.get(element).contains(contains)
  cy.dataCy('loadingIndicator').should('not.exist')
}

const getTile = ({
  tile,
  url,
  timer = 1000
}: {
  tile: string
  url?: string
  timer?: number
}): any => {
  cy.contains('div', tile)
    .click()
    .then(() => {
      url && cy.url().should('include', `/${url}`).wait(timer).go('back').wait(timer)
    })
}

const testCalendar = (timer = 1000): any => {
  cy.get('.fc-header-toolbar').within(() => {
    cy.get('.fc-prev-button').click().wait(timer)
    cy.get('.fc-next-button').click().wait(timer)
    cy.get('.fc-today-button').should('be.disabled').wait(timer)
    cy.get('.fc-toolbar-title')
    cy.get('.fc-dayGridMonth-button').click().wait(timer)
    cy.get('.fc-timeGridWeek-button').click().wait(timer)
    cy.get('.fc-timeGridDay-button').click().wait(timer)
    cy.get('.fc-listWeek-button').click().wait(timer)
  })
  cy.get('.fc-list-empty')
}

export {
  dataCy,
  getDropdownNavItem,
  getInputByName,
  getNavItem,
  getTab,
  getTableInModule,
  getTile,
  id,
  testCalendar
}
