import pages from '../../../../frontend/src/config/pages'
import { BUTTONS } from '../../constants/buttons'
import { timer } from '../../constants/misc'
import { loginAsClient } from '../../utils/login'

const coursesModule = 'Courses'

describe('/Courses', () => {
  const course = 'new course'
  before(() => {
    loginAsClient(pages.dashboard.coursesClient.root)
  })

  describe('UI Tests', () => {
    it('should show Filters and Grid', () => {
      // assert that a matching request has been made
      cy.dataCy('layout-list').within(() => {
        cy.getFilterComponent()
        cy.getDetails2(coursesModule)
          .within(() => {})
          .should('have.prop', 'title')
          .testListPage(coursesModule)
          .wait(timer)
      })
    })
    describe('insert', () => {
      before(() => {
        cy.dataCy('create-course-button').click()
      })

      it('should raise error', () => {
        cy.dataCy('offCanvas').within(() => {
          cy.offCanvasCheckHeader('Add a Course').should('exist')

          cy.get('form')
            .within(() => {
              cy.hasField('select', 'status')
              // cy.formSelect('status', 'Active', true)
            })
            .submit()
            .should('be.visible')
            .wait(timer)
        })
      })

      it('should insert a new Course', () => {
        cy.dataCy('offCanvas').within(() => {
          cy.get('form')
            .within(() => {
              cy.formTextInput('title', course)

              cy.hasField('select', 'status')
              cy.formSelect('status', 'Active')
              cy.formTextarea('description', 'description')
            })
            .submit()
            .should('not.exist')
            .wait(timer)
        })
      })
    })
    describe('edit', () => {
      it('should edit Course', () => {
        cy.dataCy('create-course-button').click()

        cy.dataCy('offCanvas').within(() => {
          cy.get('form')
            .within(() => {
              cy.formTextInput('title', course)

              cy.hasField('select', 'status')
              cy.formTextarea('description', 'new description')
            })
            .submit()
            .should('not.exist')
            .wait(timer)
        })
      })
    })

    describe('delete', () => {
      it('should delete the Course', () => {
        cy.dataCy('layout-list').within(() => {
          cy.getTableInModule(coursesModule)
            .find('tbody')
            .children()
            .eq(0)
            .should('include.text', course)

            .find('button')
            .children()
            .eq(BUTTONS.Delete)
            .click()
            .wait(timer)
        })
      })
      it('should delete the Course', () => {
        cy.dataCy('offCanvas')
          .should('be.visible')
          .within(() => {
            cy.contains('p', `'${course}'`)
            cy.get('button').contains('Delete').click()
          })
      })
    })
  })
})
