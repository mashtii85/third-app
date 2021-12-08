import { ENTITY_QUERY } from '../constants/queries'
import { aliasQuery } from './gql'
import { prepareQueryName } from './query'

const url = Cypress.env('backendUrl')

const fetchQueryAPI = (queryName: ENTITY_QUERY): any => {
  const query = prepareQueryName(queryName)

  cy.log(`query name: ${queryName}`)

  cy.intercept('POST', url, (req) => {
    aliasQuery(req, queryName)
  })

  cy.wait(query).then((xhr) => {
    // expect(xhr.response.body.data.account).have.length.gte(0)
    expect(xhr.response.statusCode).equal(200)
    return cy.wrap(xhr?.response?.body?.data)
  })
}

export { fetchQueryAPI }
