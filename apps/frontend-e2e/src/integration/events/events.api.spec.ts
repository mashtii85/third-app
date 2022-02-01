import { ENTITY_QUERY } from '../../constants/queries'
import { aliasQuery } from '../../utils/gql'
import { prepareQueryName } from '../../utils/query'
import { pages } from '@availabletowork/constants'
import { loginAsClient } from '../../utils/login'
// nx e2e frontend-e2e --prod
const eventsModule = 'events'
const url = Cypress.env('backendUrl')

const eventQuery = prepareQueryName(ENTITY_QUERY.GetEvents)

describe('should fetch all events successfully', () => {
  beforeEach(() => {
    loginAsClient(pages.dashboard.events.list)
  })

  it('should fetch data from API successfully', () => {
    cy.log(eventQuery)

    cy.intercept('POST', url, (req) => {
      aliasQuery(req, ENTITY_QUERY.GetEvents)
    })
    cy.wait(eventQuery).then((xhr) => {
      expect(xhr.response.body.data.events).have.length.gte(0)
      expect(xhr.response.statusCode).equal(200)
    })
  })

  it.only('should fetch data from Mock successfully', () => {
    cy.fixture(eventsModule).then((eventsData) => {
      cy.intercept('POST', url, (req) => {
        aliasQuery(req, ENTITY_QUERY.GetEvents, {
          statusCode: 200,
          body: eventsData
        })
      })

      cy.wait(eventQuery, { timeout: 10000 }).then((xhr) => {
        expect(xhr.response.body.data.events.length).equals(eventsData.data.events.length)
        expect(xhr.response.statusCode).equal(200)
      })
    })
  })
})
