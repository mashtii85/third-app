import { timer } from '../../constants/misc'
import pages from '../../../../frontend/src/config/pages'
import { loginAsClient } from '../../utils/login'
import { openOffCanvas } from '../../utils/helpers'

enum BUTTONS {
  Edit,
  Groups,
  Delete
}

const accountsModule = 'Accounts'

const openEditOffCanvas = (): any => {
  it('should open edit offCanvas for Account', () => {
    openOffCanvas(accountsModule, BUTTONS.Edit)
  })
}

describe('/Members', () => {
  before(() => {
    loginAsClient(pages.dashboard.accounts.list)
  })

  describe('UI Tests', () => {
    it('should show Filters and Grid', () => {
      // assert that a matching request has been made
      cy.dataCy('layout-list').within(() => {
        cy.getFilterComponent()
        // cy.dataCy('Locations').click()
        cy.dataCy('create-member-button').click()
        cy.getDetails2(accountsModule)
          .within(() => {})
          .should('have.prop', 'title')
          .testListPage(accountsModule)
          .wait(timer)
      })
    })

    it('should raise error, so offCanvas still visible', () => {
      cy.dataCy('offCanvas').within(() => {
        cy.offCanvasCheckHeader('Add a Member')
        cy.get('form')
          .within(() => {
            cy.hasField('select', 'status')
            cy.formSelect('status', 'Active')
            cy.formReactSelect('taxonomy', 0)
          })
          .submit()
          .should('be.visible')
          .wait(timer)
      })
    })

    const member = 'new member'
    it('should insert a member', () => {
      cy.dataCy('offCanvas')
        .should('be.visible')
        .within(() => {
          cy.offCanvasCheckHeader('Add a Member')
          cy.get('form')
            .within(() => {
              cy.formTextInput('name', member)
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

    describe('edit', () => {
      describe('failure path', () => {
        openEditOffCanvas()
        it('should edit Account and add contact user', () => {
          cy.dataCy('offCanvas')
            .should('be.visible')
            .within(() => {
              cy.offCanvasCheckHeader('Edit Member')
              cy.get('form')
                .within(() => {
                  cy.formTextInput('name', member)
                  // Status
                  cy.hasField('select', 'status')
                  cy.formSelect('status', 'Active')
                  cy.formCheckbox('add_contact_user').check()
                  cy.formTextInput('firstName', 'first name')
                  cy.formTextInput('lastName', 'last name')
                  cy.formTextInput('phone', '11sd')
                })
                .submit()
                .should('exist')
            })
            .wait(timer)
          cy.offCanvasClose()
        })

        describe('happy path', () => {
          openEditOffCanvas()
          it('should edit Account and add contact user', () => {
            cy.dataCy('offCanvas')
              .should('be.visible')
              .within(() => {
                cy.offCanvasCheckHeader('Edit Member')
                cy.get('form')
                  .within(() => {
                    cy.formTextInput('name', member)
                    // Status
                    cy.hasField('select', 'status')
                    cy.formSelect('status', 'Active')
                    cy.formCheckbox('add_contact_user').check()
                    cy.formTextInput('firstName', 'John')
                    cy.formTextInput('lastName', 'Doe')
                    cy.formTextInput('phone', '989195078781')
                    cy.formTextInput('email', 'john@gmail.com')
                  })
                  .submit()
                  .should('exist')
              })
              .wait(timer)
            cy.offCanvasClose()
          })
        })
      })
    })

    describe('delete', () => {
      it('should open delete offCanvas', () => {
        cy.getTableInModule(accountsModule)
          .find('tbody')
          .children()
          .eq(0)

          .find('button')
          .children()
          .eq(BUTTONS.Delete)
          .click()
          .wait(timer)
      })

      it('should delete member', () => {
        cy.dataCy('offCanvas')
          .should('be.visible')
          .within(() => {
            cy.contains('p', "'new member'")
            cy.get('button').contains('Delete').click()
          })
      })
    })
  })
})
