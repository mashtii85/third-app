import { CATEGORIES_TABS } from '../../constants/categories'
import { timer } from '../../constants/misc'
import pages from '../../../../frontend/src/config/pages'
describe('/Categories', () => {
  before(() => {
    const { client } = Cypress.env('users')

    cy.login(client.email, client.password).then(() => cy.visit(pages.dashboard.categories.view))
  })

  describe(`${CATEGORIES_TABS.Members}`, () => {
    it(`should show ${CATEGORIES_TABS.Members}`, () => {
      cy.url().should('include', '/categories')
      cy.dataCy(CATEGORIES_TABS.Members).click()
      cy.url().should('include', '/categories')
    })
    describe('Member Types', () => {
      it('should open Create new member offCanvas', () => {
        cy.getDetails2('Member Types').within(() => {
          cy.contains('button', 'Add New').click()
        })
        cy.wait(timer)
      })
      it('should close Create new member offCanvas', () => {
        cy.get('button').last().click()
        cy.wait(timer)
      })
    })
    describe('Groups', () => {
      it('should open Create group offCanvas', () => {
        cy.getDetails2('Groups')
          .within(() => {
            cy.contains('button', 'Create a group').click()
          })
          .wait(timer)
      })
    })
  })
})
