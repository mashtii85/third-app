import { timer } from '../../../constants/misc'
import { loginAsClient } from '../../../utils/login'
import { pages } from '@availabletowork/types'

const enum TABS {
  Account = 'account0Tab',
  Users = 'users1Tab'
}
describe('/Account', () => {
  before(() => {
    loginAsClient(pages.dashboard.account.view)
    // loginAsClient('/dashboard/account')
  })

  describe(`${TABS.Account}`, () => {
    it(`should show The ${TABS.Account} by default`, () => {
      cy.dataCy(`${TABS.Account}`)
      cy.getDetails2('Account Details').wait(timer)
    })
  })

  describe(`${TABS.Users}`, () => {
    const usersModule = 'Users'
    it(`should show The ${TABS.Users}`, () => {
      cy.dataCy(`${TABS.Users}`).click()

      // assert that a matching request has been made
      // cy.dataCy('layout-list').within(() => {
      //   cy.getFilterComponent()
      //   cy.getDetails2(usersModule)
      //     .within(() => {})
      //     .should('have.prop', 'title')
      //     // .testListPage(usersModule)
      //     .wait(timer)
      // })
    })

    it('should show add user offcanvas', () => {
      cy.dataCy('create-user-button').click()
    })
  })
})
