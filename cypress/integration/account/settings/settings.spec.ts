import { timer } from '../../../constants/misc'
import { SETTINGS_TABS } from '../../../constants/settings'
import { loginAsClient } from '../../../utils/login'
import pages from '../../../../src/config/pages'

describe("/Account's settings", () => {
  before(() => {
    loginAsClient(pages.dashboard.account.settings)
  })

  describe(`${SETTINGS_TABS.Theme}`, () => {
    it(`should show The ${SETTINGS_TABS.Theme} by default`, () => {
      cy.dataCy(`${SETTINGS_TABS.Theme}`)
      cy.getDetails2('Color Scheme').within(() => { })

      cy.getDetails2('Brand')
      cy.getDetails2('Theme Logo').wait(timer)
    })
  })
  describe(`${SETTINGS_TABS.Address}`, () => {
    it(`should show The ${SETTINGS_TABS.Address}`, () => {
      cy.dataCy(`${SETTINGS_TABS.Address}`).click()
      cy.getDetails2('Registered address').wait(timer)
    })
  })
})
