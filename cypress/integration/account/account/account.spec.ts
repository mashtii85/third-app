import { timer } from '../../../constants/misc'
import { loginAsClient } from '../../../utils/login'
import pages from '../../../../src/config/pages'

const enum TABS {
  Account = 'accountTab',
  Users = 'usersTab'
}
describe('/Account', () => {
  before(() => {
    loginAsClient(pages.dashboard.account.view)
  })

  describe(`${TABS.Account}`, () => {
    it(`should show The ${TABS.Account} by default`, () => {
      cy.dataCy(`${TABS.Account}`)
      cy.getDetails2('Account Details').within(() => { })
    })
  })

  describe(`${TABS.Users}`, () => {
    const usersModule = 'Users'
    it(`should show The ${TABS.Users}`, () => {
      cy.dataCy(`${TABS.Users}`).click()

      // assert that a matching request has been made
      cy.dataCy('layout-list').within(() => {
        cy.getFilterComponent()
        cy.getDetails2(usersModule)
          .within(() => { })
          .should('have.prop', 'title')
          // .testListPage(usersModule)
          .wait(timer)
      })
    })

    it('should show add user offcanvas', () => {
      cy.dataCy('create-user-button').click()
    })
  })
})
