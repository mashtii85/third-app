/**
 * Cypress - Commands - Components
 */
export const getDetails2 = (title: string): any => cy.get('p').contains(title)

// cy.get('summary').contains('Filters').parent().should('not.have.attr', 'open')
