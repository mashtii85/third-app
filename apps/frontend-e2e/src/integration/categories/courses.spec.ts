import { CATEGORIES_TABS } from '../../constants/categories'
import { timer } from '../../constants/misc'
import { pages } from '@availabletowork/constants'
import { loginAsClient } from '../../utils/login'

describe('/Categories', () => {
  before(() => {
    loginAsClient(pages.dashboard.categories.view)
  })

  describe(`${CATEGORIES_TABS.Courses}`, () => {
    it('should show Courses Table', () => {
      cy.url().should('not.include', '/categories?tab=courses')
      cy.dataCy(CATEGORIES_TABS.Courses).click()
      cy.url().should('include', '/categories?tab=courses')

      cy.contains('Course Types').should('have.prop', 'title').wait(timer)
    })
  })
})
