import { ENTITY_QUERY } from '../../constants/queries'
import { fetchQueryAPI } from '../../utils/api'
import { loginAsClient } from '../../utils/login'
import { pages } from '@availabletowork/constants'

describe(`fetch queries`, () => {
  before(() => {
    loginAsClient(pages.dashboard.root)
  })

  describe('fetch Tiles', () => {
    it(`should fetch Tiles Data successfully`, () => {
      fetchQueryAPI(ENTITY_QUERY.GetTilesData)
    })
  })
})
