enum BUTTONS {
  Edit,
  Delete
}
const timer = 1500
describe('/Locations', () => {
  before(() => {
    const { client } = Cypress.env('users')

    cy.login(client.email, client.password).then(() => cy.visit('/dashboard/locations'))
  })

  it('should show Filters and Grid', () => {
    cy.dataCy('layout-list').within(() => {
      cy.getFilterComponent()
      // cy.dataCy('Locations').click()
      // cy.dataCy('aaa').click()
      cy.dataCy('create-location-button').click()
      cy.getDetails2('Locations')
        .within(() => { })
        .should('have.prop', 'title')
        .testListPage('Locations')
        .wait(timer)
    })
  })

  it('should raise error, so offCanvas still visible', () => {
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
  })

  it('should insert a location', () => {
    cy.dataCy('offCanvas')
      .should('be.visible')
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
          .should('not.exist')
      })
      .wait(timer)
  })
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
            cy.formTextInput('name', '1')
            // // Status
            cy.hasField('select', 'status')
            cy.formSelect('status', 'Active')
            // // Location Type
            // cy.formReactSelect('taxonomy', 0)
          })
          .submit()
          .should('not.exist')
      })
      .wait(timer)
  })

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
