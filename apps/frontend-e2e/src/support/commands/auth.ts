/**
 * Cypress - Support - Commands - Auth
 */

import { timer } from '../../constants/misc'

export const login = (email: string, password: string): void => {
  const tokenName = 'bearerToken'
  const token = Cypress.env(tokenName)
  if (!token || token.length == 0) {
    cy.log('get token from api')
    const url = Cypress.env('url')
    cy.request({
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      url: `${url}/auth/login`,
      method: 'POST',
      body: {
        email,
        password
      }
    })
      .then((response) => {
        const tokenFromResponse = response?.body?.token
        if (tokenFromResponse) {
          Cypress.env(tokenName, tokenFromResponse)

          window.localStorage.setItem(tokenName, tokenFromResponse)
          return { bearerToken: tokenFromResponse }
        }
        return null
      })
      .wait(timer)
  } else {
    window.localStorage.setItem(tokenName, token)
    cy.log('token exist')
  }
}
