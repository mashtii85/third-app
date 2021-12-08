import { BUTTONS } from '../../constants/buttons'
import pages from '../../../src/config/pages'
import { timer } from '../../constants/misc'
import { loginAsClient } from '../../utils/login'

const eventsModule = 'Events'

const openEditOffCanvas = (): any => {
  it('should open edit offCanvas for Event', () => {
    cy.getTableInModule(eventsModule)
      .find('tbody')
      .children()
      .eq(0)

      .find('button')
      .children()
      .eq(BUTTONS.Edit)
      .wait(timer)
      .click()
  })
}

describe('/Events', () => {
  before(() => {
    loginAsClient(pages.dashboard.events.list)
  })

  describe('UI Tests', () => {
    it('should show Filters and Grid', () => {
      // assert that a matching request has been made
      cy.dataCy('layout-list').within(() => {
        cy.getFilterComponent()
        cy.dataCy('create-event-button').click()
        cy.getDetails2(eventsModule)
          .within(() => { })
          .should('have.prop', 'title')
          .testListPage(eventsModule)
          .wait(timer)
      })
    })

    it('should raise error, so offCanvas still visible', () => {
      cy.dataCy('offCanvas').within(() => {
        cy.offCanvasCheckHeader('Add an Event')
        cy.get('form')
          .within(() => {
            // cy.hasField('select', 'status')
            // cy.formSelect('status', 'Active')
            // cy.formReactSelect('taxonomy', 0)
          })
          .submit()
          .should('be.visible')
          .wait(timer)
      })
    })
    const event = 'new event'
    it('should insert an event successfully', () => {
      cy.dataCy('offCanvas')
        // .should('be.visible')
        .within(() => {
          cy.offCanvasCheckHeader('Add an Event')
          cy.get('form')
            .within(() => {
              cy.formTextInput('title', event)
              // // Member Type
              cy.formReactSelect('taxonomy', 0)
              // // Status
              cy.hasField('select', 'status')
              cy.formSelect('status', 'Active')
            })
            .wait(timer)
            .submit()
            .should('not.exist')
        })
        .wait(timer)
    })

    openEditOffCanvas()
    it('should edit Account and add contact user', () => {
      cy.dataCy('offCanvas')
        .should('be.visible')
        .within(() => {
          cy.offCanvasCheckHeader('Edit Event')
          cy.get('form')
            .within(() => {
              cy.formTextInput('title', 'new event1')
              // Status
              cy.hasField('select', 'status')
              cy.formSelect('status', 'Active')
            })
            .submit()
            .should('exist')
        })
        .wait(timer)
    })

    it('should open delete offCanvas for events', () => {
      cy.getTableInModule(eventsModule)
        .find('tbody')
        .children()
        .eq(0)

        .find('button')
        .children()
        .eq(BUTTONS.Delete)
        .click()
        .wait(timer)
    })

    it('should delete events', () => {
      cy.dataCy('offCanvas')
        .should('be.visible')
        .within(() => {
          cy.contains('p', "'new event1'")
          cy.get('button').contains('Delete').click()
        })
    })
  })
})
