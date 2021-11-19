/**
 * Cypress - Support - Commands - Auth
 */
import { ACCOUNT_TYPE } from '../../../src/types/account'
// Login
// Accepted types: admin, supplier
export const _singIn = (): void => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3000/api/users/login',
    body: {
      user: {
        email: 'uaefa@example.com',
        password: 'Lms1234!'
      }
    }
  }).then((resp) => {
    window.localStorage.setItem('jwt', resp.body.user.token)
  })
}

export const login = (type: ACCOUNT_TYPE | string): void => {
  const userType = type.toUpperCase()
  cy.log(userType)
  // _singIn()
  cy.on('window:before:load', (win) => {
    win.localStorage.setItem('bearerToken', Cypress.env(`token`))
  })
}

declare global {
  namespace Cypress {
    interface Chainable {
      login: typeof login
    }
  }
}
