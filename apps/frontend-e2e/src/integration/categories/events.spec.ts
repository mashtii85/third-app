import { CATEGORIES_TABS } from '../../constants/categories'
import { timer } from '../../constants/misc'
import pages from '../../../../frontend/src/config/pages'
describe('/Categories', () => {
  before(() => {
    const { client } = Cypress.env('users')

    cy.login(client.email, client.password).then(() => cy.visit(pages.dashboard.categories.view))
  })

  describe(`${CATEGORIES_TABS.Events}`, () => {
    it('should show Events Table', () => {
      cy.url().should('not.include', '/categories?tab=events')
      cy.dataCy(CATEGORIES_TABS.Events).click()
      cy.url().should('include', '/categories?tab=events')

      cy.contains('Event Types').should('have.prop', 'title').wait(timer)
    })
  })
})
