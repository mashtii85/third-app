import { pages } from '@availabletowork/constants'
import { timer } from '../../constants/misc'
import { loginAsClient } from '../../utils/login'

enum BUTTONS {
  Edit,
  Delete
}
describe('/Locations', () => {
  before(() => {
    loginAsClient(pages.dashboard.locations.list)
  })

  describe('UI Tests', () => {
    it('should show Filters and Grid', () => {
      // assert that a matching request has been made
      cy.dataCy('layout-list').within(() => {
        cy.getFilterComponent()
        // cy.dataCy('Locations').click()
        cy.getDetails('Locations')
          .within(() => {})
          .should('have.prop', 'title')
          .testListPage('Locations')
          .wait(timer)
      })
      // cy.offCanvasClose()
    })

    describe('insert', () => {
      it('should raise error, so offCanvas still visible', () => {
        cy.dataCy('create-location-button').click().wait(timer)

        cy.dataCy('offCanvas').within(() => {
          cy.offCanvasCheckHeader('Add a location')
          cy.get('form')
            .within(() => {
              cy.hasField('select', 'status')
              cy.formSelect('status', 'Active')
              // // Location Type
              cy.formReactSelect('taxonomy', 0)
            })
            .submit()
            .should('be.visible')
            .wait(timer)
        })
        cy.offCanvasClose()
      })

      it('should insert a location', () => {
        cy.dataCy('create-location-button').click().wait(timer)

        cy.dataCy('offCanvas')
          // .should('be.visible')
          .within(() => {
            cy.offCanvasCheckHeader('Add a location')
            cy.get('form')
              .within(() => {
                cy.formTextInput('name', 'new location')
                // // Status
                cy.hasField('select', 'status')
                cy.formSelect('status', 'Active')
                // // Location Type
                cy.formReactSelect('taxonomy', 0)
              })
              .wait(timer)
              .submit()
              .wait(timer)
              .should('not.exist')
          })
          .wait(timer)
      })
    })
    describe('edit', () => {
      it('should open edit offCanvas for location', () => {
        cy.getTableInModule('Locations')
          .find('tbody')
          .children()
          .eq(0)

          .find('button')
          .children()
          .eq(BUTTONS.Edit)
          .wait(timer)
          .click()
      })

      it('should edit location', () => {
        cy.dataCy('offCanvas')
          .should('be.visible')
          .within(() => {
            cy.offCanvasCheckHeader('Edit Location')
            cy.get('form')
              .within(() => {
                cy.formTextInput('name', 'new location1')
                // // Status
                cy.hasField('select', 'status')
                cy.formSelect('status', 'Active')
              })
              .submit()
              .should('not.exist')
          })
          .wait(timer)
      })
    })
    describe('delete', () => {
      it('should open delete offCanvas for location', () => {
        cy.getTableInModule('Locations')
          .find('tbody')
          .children()
          .eq(0)

          .find('button')
          .children()
          .eq(BUTTONS.Delete)
          .click()
          .wait(timer)
      })

      it('should delete location', () => {
        cy.dataCy('offCanvas')
          .should('be.visible')
          .within(() => {
            cy.contains('p', "'new location1'")
            cy.get('button').contains('Delete').click()
          })
      })
    })
  })
})
