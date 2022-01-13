/**
 * Accounts - Sign In
 */

import pages from '../../../../frontend/src/config/pages'
import { timer } from '../../constants/misc'
describe('Accounts/Signin', () => {
  before(() => cy.visit(pages.account.signIn))

  it('Should render page correctly', () => {
    cy.contains('h1', 'Log In')
    cy.get('form')

    cy.get('input[name="email"]').should('have.attr', 'type', 'text').should('be.empty')

    cy.get('input[name="password"]')
      .should('have.attr', 'type', 'password')
      .should('be.empty')
      .wait(timer)
  })

  it('Should display errors on incorrect input values', () => {
    cy.get('input[name="email"]')
      .type('text{enter}')
      .should('have.css', 'border-color', 'rgb(232, 9, 94)')
      .wait(timer)
  })

  it('Should login successfully', () => {
    const { client } = Cypress.env('users')
    cy.get('input[name="email"]').clear().type(client.email)
    cy.get('input[name="password"]').type(`${client.password}{enter}`)
    cy.url({
      timeout: 60000
    }).should('include', '/dashboard')
  })
})
