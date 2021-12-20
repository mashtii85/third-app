import { ENTITY_QUERY } from '../../constants/queries'
import { loginAsClient } from '../../utils/login'
import pages from '../../../src/config/pages'
import { prepareQueryName } from '../../utils/query'
import { aliasQuery } from '../../utils/gql'

describe(`fetch queries`, () => {
  const url = Cypress.env('backendUrl')
  const accountsModule = 'Accounts'

  beforeEach(() => {
    loginAsClient(pages.dashboard.accounts.list)
  })

  describe('should fetch all members successfully', () => {
    const accountQuery = prepareQueryName(ENTITY_QUERY.GetAccounts)
    it('should fetch data from API successfully', () => {
      cy.intercept('POST', url, (req) => {
        aliasQuery(req, ENTITY_QUERY.GetAccounts)
      })
      cy.wait(accountQuery).then((xhr) => {
        expect(xhr.response.body.data.accounts).have.length.gte(0)
        expect(xhr.response.statusCode).equal(200)
      })
    })
    it('should fetch data from Mock successfully', () => {
      cy.fixture(accountsModule).then((accountsData) => {
        cy.log(accountsData)
        cy.intercept('POST', url, (req) => {
          aliasQuery(req, ENTITY_QUERY.GetAccounts, {
            statusCode: 200,
            body: accountsData
          })
        })

        cy.wait(accountQuery, { timeout: 10000 }).then((xhr) => {
          // cy.wrap(xhr).its('body')
          expect(xhr.response.body.data.accounts.length).equals(accountsData.data.accounts.length)
          expect(xhr.response.statusCode).equal(200)
        })
      })
    })
  })
})
