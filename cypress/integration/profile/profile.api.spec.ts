import { ENTITY_QUERY } from '../../constants/queries'
import { fetchQueryAPI } from '../../utils/api'
import { loginAsClient } from '../../utils/login'
import pages from '../../../src/config/pages'
import { timer } from '../../constants/misc'

describe(`fetch queries`, () => {
  beforeEach(() => {
    loginAsClient(pages.dashboard.profile)
  })

  describe('Fetch', () => {
    it(`should fetch User successfully`, () => {
      fetchQueryAPI(ENTITY_QUERY.GetUser)
      cy.wait(timer)
    })
    it(`should fetch Medium successfully`, () => {
      fetchQueryAPI(ENTITY_QUERY.GetMedium)
    })
  })
})
