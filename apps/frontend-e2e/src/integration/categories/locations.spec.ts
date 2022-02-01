import { CATEGORIES_TABS } from '../../constants/categories'
import { timer } from '../../constants/misc'
import { pages } from '@availabletowork/constants'
describe('/Categories', () => {
  before(() => {
    const { client } = Cypress.env('users')

    cy.login(client.email, client.password).then(() => cy.visit(pages.dashboard.categories.view))
  })

  describe(`${CATEGORIES_TABS.Locations}`, () => {
    it('should show Locations Table', () => {
      cy.url().should('not.include', '/categories?tab=locations')
      cy.dataCy(CATEGORIES_TABS.Locations).click()
      cy.url().should('include', '/categories?tab=locations')
      cy.contains('Location Types').should('have.prop', 'title').wait(timer)
    })
  })
})
