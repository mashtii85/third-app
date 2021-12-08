const loginAsClient = (route: string): any => {
  const { client } = Cypress.env('users')

  cy.login(client.email, client.password).then(() => cy.visit(route))
}

export { loginAsClient }
