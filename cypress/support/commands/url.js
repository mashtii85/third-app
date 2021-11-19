/**
 * Cypress - Commands - URL
 * Verifies that the path is included in the current url
 */

// Verify Url
Cypress.Commands.add('verifyPath', (path, options = {}) =>
  cy.url(options).should('eq', Cypress.config().baseUrl + path)
)

// Visit and verify url
Cypress.Commands.add('go', (path) => {
  cy.visit(path)
  cy.verifyPath(path)
})
