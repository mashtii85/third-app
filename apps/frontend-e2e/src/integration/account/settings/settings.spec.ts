import { timer } from '../../../constants/misc'
import { SETTINGS_TABS } from '../../../constants/settings'
import { loginAsClient } from '../../../utils/login'
import { pages } from '@availabletowork/constants'

describe("/Account's settings", () => {
  before(() => {
    loginAsClient(pages.dashboard.account.settings)
  })

  describe(`${SETTINGS_TABS.Theme}`, () => {
    it(`should show The ${SETTINGS_TABS.Theme} by default`, () => {
      cy.dataCy(`${SETTINGS_TABS.Theme}`)
      cy.getDetails('Color Scheme').within(() => {})

      cy.getDetails('Brand')
      cy.getDetails('Theme Logo').wait(timer)
    })
  })
  describe(`${SETTINGS_TABS.Address}`, () => {
    it(`should show The ${SETTINGS_TABS.Address}`, () => {
      cy.dataCy(`${SETTINGS_TABS.Address}`).click()
      cy.getDetails('Registered address').wait(timer)
    })
  })
})
