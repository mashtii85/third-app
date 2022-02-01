import { timer } from '../../constants/misc'
import { pages } from '@availabletowork/constants'
import { loginAsClient } from '../../utils/login'

const enrollmentsModule = 'Enrollments'

describe('/Enrollments', () => {
  before(() => {
    loginAsClient(pages.dashboard.enrollments.root)
  })

  describe('UI Tests', () => {
    it('should show Filters and Grid', () => {
      // assert that a matching request has been made
      cy.dataCy('layout-list').within(() => {
        cy.getFilterComponent()
        cy.getDetails(enrollmentsModule)
          .within(() => {})
          .should('have.prop', 'title')
          .testListPage(enrollmentsModule)
          .wait(timer)
      })
    })
  })
})
