import { timer } from '../../../../constants/misc'
import { ENTITY_QUERY } from '../../../../constants/queries'
import { SETTINGS_TABS } from '../../../../constants/settings'
import { fetchQueryAPI } from '../../../../utils/api'
import { loginAsClient } from '../../../../utils/login'
import pages from '../../../../../src/config/pages'

describe(`fetch queries`, () => {
  before(() => {
    loginAsClient(pages.dashboard.account.settings)
  })

  describe(`${SETTINGS_TABS.Theme}`, () => {
    it(`should fetch API for ${SETTINGS_TABS.Theme} tab by default`, () => {
      fetchQueryAPI(ENTITY_QUERY.GetAccount)
      cy.wait(timer)
    })
  })
})
