import { ENTITY_QUERY } from '../../constants/queries'
import { fetchQueryAPI } from '../../utils/api'
import { loginAsClient } from '../../utils/login'
import pages from '../../../src/config/pages'

describe(`fetch queries`, () => {
  before(() => {
    loginAsClient(pages.dashboard.profile)
  })

  describe('fetch data', () => {
    it(`should fetch User successfully`, () => {
      fetchQueryAPI(ENTITY_QUERY.GetUser)
    })
    it(`should fetch Medium successfully`, () => {
      fetchQueryAPI(ENTITY_QUERY.GetMedium)
    })
  })
})
