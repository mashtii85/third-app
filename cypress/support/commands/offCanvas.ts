/**
 * Cypress - Commands - OffCanvas
 */

const offCanvasVisible = (): any => cy.get('[data-cy=offCanvas]').should('be.visible')

const offCanvasClose = (): any => cy.get('[data-cy=offCanvas] button').last().click()

const offCanvasCheckHeader = (title: string): any =>
  cy.get('[data-cy=offCanvasHeader]').should('be.visible').contains(title)

export { offCanvasCheckHeader, offCanvasClose, offCanvasVisible }
