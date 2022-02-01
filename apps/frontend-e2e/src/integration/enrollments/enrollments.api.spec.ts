import { ENTITY_QUERY } from '../../constants/queries'
import { fetchQueryAPI } from '../../utils/api'
import { loginAsClient } from '../../utils/login'
import { pages } from '@availabletowork/constants'

describe(`fetch queries`, () => {
  before(() => {
    loginAsClient(pages.dashboard.enrollments.root)
  })

  describe('fetch data', () => {
    it(`should fetch Enrollments successfully`, () => {
      fetchQueryAPI(ENTITY_QUERY.GetEnrollments)
    })
  })
})
