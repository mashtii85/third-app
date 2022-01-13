/**
 * Cypress - Commands - Components
 */
export const getDetails2 = (title: string): any =>
  cy.contains('p', title).parent().parent().parent()
