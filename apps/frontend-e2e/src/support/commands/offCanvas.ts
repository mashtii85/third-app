/**
 * Cypress - Commands - OffCanvas
 */

import { timer } from '../../constants/misc'

const offCanvasVisible = (): any => cy.get('[data-cy=offCanvas]').should('be.visible')

const offCanvasClose = (): any => cy.get('[data-cy=offCanvas] button').last().click().wait(timer)

const offCanvasCheckHeader = (title: string): any =>
  cy.get('[data-cy=offCanvasHeader]').should('be.visible').contains(title)

export { offCanvasCheckHeader, offCanvasClose, offCanvasVisible }
