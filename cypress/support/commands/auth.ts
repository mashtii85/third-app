/**
 * Cypress - Support - Commands - Auth
 */

export const login = (email: string, password: string): any => {
  const timer = 1000
  cy.dataSession({
    name: 'login',
    setup() {
      cy.request({
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        url: 'http://localhost:3100/api/auth/login',
        method: 'POST',
        body: {
          email,
          password
        }
      })
        .then((response) => {
          if (response?.body?.token) {
            window.localStorage.setItem('bearerToken', response.body.token)
            return { bearerToken: response.body.token }
          }
          return null
        })
        .wait(timer)
    },
    validate(saved) {
      if (saved.bearerToken != null) {
        window.localStorage.setItem('bearerToken', saved.bearerToken)
        return true
      }
      return false
    },
    recreate(saved) {
      Cypress.env('bearerToken', saved.bearerToken)
      cy.setCookie('bearerToken', saved.bearerToken)
    },
    shareAcrossSpecs: true
  })
}
