/**
 * Home - Home
 */
import { pages } from '@availabletowork/constants'
import { timer } from '../../constants/misc'
import { loginAsClient } from '../../utils/login'

describe('/Home', () => {
  before(() => {
    loginAsClient(pages.dashboard.root)
  })

  it('should test Nav Items correctly', () => {
    cy.get('#navHomeMenu')

    cy.getDropdownNavItem('Members', [
      '#navItemsStudents',
      '#navItemsTeachers',
      '#navItemsPlayers',
      '#navItemsOrganisations',
      '#navMembersList'
    ])

    cy.getDropdownNavItem('Locations', [
      '#navItemsBuildings',
      '#navItemsTraining\\ fields',
      '#navItemsStadiums',
      '#navLocationsList'
    ])

    cy.getDropdownNavItem('Events', [
      '#navItemsMatches',
      '#navItemsTraining\\ sessions',
      '#navEventsList'
    ])

    cy.getDropdownNavItem('Learning', [
      '#navItemsGeneral\\ Courses',
      '#navCourses',
      '#navEnrollments'
    ])

    cy.get('.fa-cog')
      .click()
      .get('.dropdown--menu')
      .within(() => {
        cy.get('.dropdown--link').should('have.length', 3)
      })

    cy.getDropdownNavItem('UAE FA', ['#navProfile', '#navLogout'])

    it('should render tiles correctly', () => {
      cy.getTile({ tile: 'Active Courses', timer, url: 'courses' })
      cy.getTile({ tile: 'Enrolled Courses' })
      cy.getTile({ tile: 'Completed Courses' })
    })

    it('should test Calendar correctly', () => {
      cy.dataCy('client-dashboard').within(() => {
        cy.testCalendar(timer)
      })
    })
  })
})
