import { ENTITY_QUERY } from '../../../constants/queries'
import { fetchQueryAPI } from '../../../utils/api'
import { loginAsClient } from '../../../utils/login'
import pages from '../../../../src/config/pages'

describe('should fetch all users successfully', () => {
  before(() => {
    loginAsClient(pages.dashboard.account.view)
  })
  it('should fetch data from API successfully', () => fetchQueryAPI(ENTITY_QUERY.GetAccount))
})
