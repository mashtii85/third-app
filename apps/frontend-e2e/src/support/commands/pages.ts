/**
 * Cypress - Support - Pages
 */
const goToViewThroughList = (listPage: string, listPageTitle: string): any => {
  cy.visit(listPage)

  const tableFirstRow = cy.getTableInModule(listPageTitle).find('tbody').children().eq(0)

  tableFirstRow.then((row) => {
    // @ts-ignore: Unreachable code error
    if (!row.text().includes('No data available')) {
      tableFirstRow.click('left').then(() => {})
    }
  })
}

const goToViewThroughListOffCanvas = (listPage: string, listPageTitle: string): any => {
  cy.visit(listPage)

  const tableFirstRow = cy.getTableInModule(listPageTitle, 'p').get('tbody').children().eq(0)

  tableFirstRow.then((row) => {
    // @ts-ignore: Unreachable code error
    if (!row.text().includes('No data available')) {
      tableFirstRow.find('a').first().click()
    }
  })

  cy.offCanvasVisible()

  cy.dataCy('offCanvas').find(' [data-cy=jobDetails] a').first().click({ force: true })
}

const testLayout = (): any =>
  cy.dataCy('navBrand').should('have.attr', 'alt', 'Logo').parent().should('have.attr', 'href', '/')

const testListPage = (page: string, clickOnFirstRow = false, element?: string): any => {
  cy.contains(page)

  const tableFirstRow = cy.getTableInModule(page, element).find('tbody').children().eq(0)

  if (clickOnFirstRow) {
    tableFirstRow.then((row) => {
      // @ts-ignore: Unreachable code error
      if (!row.text().includes('No data available')) {
        tableFirstRow.click()
        cy.url().should('contain', 'view')
      }
    })
  }
}

const testViewPage = (title = 'Details', el = 'summary'): any => {
  cy.dataCy('loadingIndicator').should('not.exist')
  cy.contains(el, title).should('be.visible')
}

export { goToViewThroughList, goToViewThroughListOffCanvas, testLayout, testListPage, testViewPage }
