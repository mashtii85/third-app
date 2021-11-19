/**
 * Accounts - Sign In
 */

import pages from '../../../src/config/pages'
describe('Accounts/Signin', () => {
  before(() => cy.visit(pages.account.signIn))

  it('Should render page correctly', () => {
    cy.contains('h1', 'Log In')
    cy.get('form')

    cy.get('input[name="email"]').should('have.attr', 'type', 'text').should('be.empty')

    cy.get('input[name="password"]').should('have.attr', 'type', 'password').should('be.empty')
  })

  it('Should display errors on incorrect input values', () => {
    cy.get('input[name="email"]')
      .type('text{enter}')
      .should('have.css', 'border-color', 'rgb(232, 9, 94)')
  })

  it('Should login successfully', () => {
    cy.get('input[name="email"]').clear().type('uaefa@example.com')
    cy.get('input[name="password"]').type(`Lms1234!{enter}`)
    cy.url({
      timeout: 60000
    }).should('include', '/dashboard')
  })
})
