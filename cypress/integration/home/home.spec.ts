/**
 * Home - Home
 */
import pages from '../../../src/config/pages'
import { timer } from '../../constants/misc'

describe('/Home', () => {
  before(() => {
    const { client } = Cypress.env('users')
    cy.login(client.email, client.password).then(() => cy.visit(pages.dashboard.root))
  })

  it('should test Nav Items correctly', () => {
    cy.get('#navHomeMenu')

    cy.getDropdownNavItem('Locations', 4, [
      '#navItemsBuildings',
      '#navItemsTraining\\ fields',
      '#navItemsStadiums',
      '#navLocationsList'
    ])
    // cy.getDropdownNavItem('Events', 3, [
    //   '#navItemsMatches',
    //   '#navItemsTraining\\ sessions',
    //   '#navEventsList'
    // ])
    // cy.getDropdownNavItem('Learning', 3, [
    //   '#navItemsGeneral\\ Courses',
    //   '#navCourses',
    //   '#navEnrollments'
    // ])
    cy.getDropdownNavItem('Members', 5, [
      '#navItemsStudents',
      '#navItemsTeachers',
      '#navItemsPlayers',
      '#navItemsOrganisations',
      '#navMembersList'
    ])
    cy.get('.fa-cog')
      .click()
      .get('.dropdown--menu')
      .within(() => {
        cy.get('.dropdown--link').should('have.length', 3)
      })

    cy.getDropdownNavItem('UAE FA', 2, ['#navProfile', '#navLogout'])

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
