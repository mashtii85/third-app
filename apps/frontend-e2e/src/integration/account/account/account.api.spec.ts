import { pages } from '@availabletowork/constants'
import { ENTITY_QUERY } from '../../../constants/queries'
import { fetchQueryAPI } from '../../../utils/api'
import { loginAsClient } from '../../../utils/login'

describe('should fetch all users successfully', () => {
  before(() => {
    cy.log(pages.dashboard.account.view)
    loginAsClient(pages.dashboard.account.view)

    // ('/dashboard/account')
  })
  it('should fetch data from API successfully', () => fetchQueryAPI(ENTITY_QUERY.GetAccount))
})
