import { timer } from '../../constants/misc'
import { loginAsClient } from '../../utils/login'
import pages from '../../../src/config/pages'

describe('/Account', () => {
  before(() => {
    loginAsClient(pages.dashboard.profile)
  })

  describe('Render Page', () => {
    it(`should show the page successfully`, () => {
      cy.dataCy('profile-header').should('exist')
      // Details
      cy.getDetails2('Details')
        .within(() => { })
        .wait(timer)
      // Accounts Table
      cy.getDetails2('Account')
        // .within(() => { })
        .should('exist')
        .wait(timer)
    })
  })

  describe('Edit Details', () => {
    it(`should edit Details successfully`, () => {
      cy.getDetails2('Details').within(() => {
        cy.get('button').click()
      })
    })
  })
})
