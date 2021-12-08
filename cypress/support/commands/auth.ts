/**
 * Cypress - Support - Commands - Auth
 */

import { timer } from '../../constants/misc'

export const login = (email: string, password: string): any => {
  const url = Cypress.env('frontendUrl')

  cy.dataSession({
    name: 'login',
    setup() {
      cy.request({
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        url: `${url}/api/auth/login`,
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
