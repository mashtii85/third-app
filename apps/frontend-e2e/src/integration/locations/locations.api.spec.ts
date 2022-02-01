import { loginAsClient } from '../../utils/login'
import { pages } from '@availabletowork/constants'
import { aliasQuery } from '../../utils/gql'

describe(`fetch queries`, () => {
  const url = Cypress.env('backendUrl')
  beforeEach(() => {
    loginAsClient(pages.dashboard.locations.list)
  })

  describe('should fetch locations successfully', () => {
    it('should fetch data from API successfully', () => {
      cy.intercept('POST', url, (req) => {
        aliasQuery(req, 'GetLocations')
      })
      cy.wait('@gqlGetLocationsQuery').then((xhr) => {
        expect(xhr.response.body.data.locations).have.length.gte(0)
        expect(xhr.response.statusCode).equal(200)
      })
    })
    it('should fetch data from Mock successfully', () => {
      cy.fixture('locations').then((locationsData) => {
        cy.intercept('POST', url, (req) => {
          aliasQuery(req, 'GetLocations', {
            statusCode: 200,
            body: locationsData
          })
        })
        cy.wait('@gqlGetLocationsQuery', { timeout: 10000 }).then((xhr) => {
          // cy.wrap(xhr).its('body')
          expect(xhr.response.body.data.locations.length).equals(
            locationsData.data.locations.length
          )
          expect(xhr.response.statusCode).equal(200)
        })
      })
    })
  })
})
