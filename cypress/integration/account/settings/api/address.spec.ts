import { timer } from '../../../../constants/misc'
import { ENTITY_QUERY } from '../../../../constants/queries'
import { SETTINGS_TABS } from '../../../../constants/settings'
import { fetchQueryAPI } from '../../../../utils/api'
import { loginAsClient } from '../../../../utils/login'
import pages from '../../../../../src/config/pages'

describe(`fetch queries`, () => {
  before(() => {
    loginAsClient(pages.dashboard.account.settings + '?tab=address')
  })

  describe(`${SETTINGS_TABS.Address}`, () => {
    it(`should fetch API for ${SETTINGS_TABS.Address} tab`, () => {
      fetchQueryAPI(ENTITY_QUERY.GetAddresses)

      cy.wait(timer)
    })
  })
})
