/**
 * Cypress - Commands - Components
 */
export const getDetails = (title: string): any => cy.contains('p', title).parent().parent().parent()
