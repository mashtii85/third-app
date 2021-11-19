/**
 * Home - Home
 */

describe('/Home', () => {
  before(() => {
    cy.login('client')
    cy.visit('/dashboard')
  })

  it('should show Tiles and Events Calendar', () => {
    cy.dataCy('ClientDashboard').within(() => {
      cy.get('p').contains('Events').parent().should('have.attr', 'open')
    })
    // cy.get('[data-cy=client-tiles]')
    // expect(cy.dataCy('ClientDashboard')).contains('')
  })
})
