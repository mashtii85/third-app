import { ENTITY_QUERY } from '../../constants/queries'
import { fetchQueryAPI } from '../../utils/api'
import { loginAsClient } from '../../utils/login'
import { pages } from '@availabletowork/constants'
describe(`fetch queries`, () => {
  before(() => {
    loginAsClient(pages.dashboard.coursesClient.root)
  })

  describe('fetch data', () => {
    it(`should fetch Courses successfully`, () => {
      fetchQueryAPI(ENTITY_QUERY.GetCourses)
    })
  })
})
