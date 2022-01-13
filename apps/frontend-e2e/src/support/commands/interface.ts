/// <reference types="cypress" />

// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    newMethod(): void
    /**
     * Custom command to select Filters Component.
     * @example cy.getFilterComponent()
     */
    getFilterComponent(): Chainable<Element>
    /**
     * Custom command to check if Filters Component exist.
     * @example cy.hasFilter()
     */
    hasFilter(): Chainable<Element>

    /**
     * Custom command to get Details2 Component.
     * @example cy.getDetails2('title')
     */
    getDetails2(title: string): Chainable<Element>

    /**
     * Custom command to get check offCanvas Visibility
     * @example cy.offCanvasVisible()
     */
    offCanvasVisible(): Chainable<Element>

    /**
     * Custom command to close offCanvas.
     * @example cy.offCanvasClose()
     */
    offCanvasClose(): Chainable<Element>

    /**
     * Custom command to get offCanvas title
     * @example cy.offCanvasCheckHeader('title')
     */
    offCanvasCheckHeader(title: string): Chainable<Element>

    // Forms

    /**
     * Custom command to get button with name `automatedWorkflow.addNewCondition`
     * @example cy.addNewCondition()
     */
    addNewCondition(): Chainable<Element>

    /**
     * Custom command to play with DatePicker
     * @example cy.datepicker(
                  placeholder: string,
                  selectTime: boolean,
                  fieldName: string,
                  dateValue: string
                )
     */
    datepicker(
      placeholder: string,
      selectTime: boolean,
      fieldName: string,
      dateValue: string
    ): Chainable<Element>

    /**
     * Custom command to play with a CheckBox
     * @example cy.formCheckbox(name: string)
     */
    formCheckbox(name: string): Chainable<Element>

    /**
     * Custom command to play with RadioButton
     * @example cy.formRadio(name: string, value: string, force?: boolean)
     */
    formRadio(name: string, value: string, force?: boolean): Chainable<Element>

    /**
     * Custom command to play with ReactSelect
     * @example cy.formReactSelect(name: string, optionIndex: string, force?: boolean)
     */
    formReactSelect(name: string, optionIndex: number, force?: boolean): Chainable<Element>

    /**
     * Custom command to play with ReactSelect by typing
     * @example cy.formReactSelectByTyping(name: string, optionName: string)
     */
    formReactSelectByTyping(name: string, optionName: string): Chainable<Element>

    /**
     * Custom command to play with Select
     * @example cy.formSelect(name: string, option: string, force?:boolean)
     */
    formSelect(name: string, option: string, force?: boolean): Chainable<Element>

    /**
     * Custom command to play with ReactSelect by picking an option
     * @example cy.reactSelectWorkflows(fieldName: string, optionIndex: string)
     */
    reactSelectWorkflows(fieldName: string, optionIndex: number): Chainable<Element>

    /**
     * Custom command to get Form's submit button
     * @example cy.formSubmitButton()
     */
    formSubmitButton(): Chainable<Element>

    /**
     * Custom command to play with TextArea
     * @example cy.formTextarea(name: string, text: string, force?:boolean)
     */
    formTextarea(name: string, text: string, force?: boolean): Chainable<Element>

    /**
     * Custom command to play with TextInput
     * @example cy.formTextInput(name: string, text: string, force?:boolean)
     */
    formTextInput(name: string, text: string, force?: boolean): Chainable<Element>

    /**
     * Custom command to get if there is any element of correspondent type exist
     * @example cy.hasField(fieldType: string, name: string, force?:boolean)
     */
    hasField(fieldType: string, name: string, force?: boolean): Chainable<Element>

    // SELECTORS

    // /**
    //  * Custom command to select DOM element by data-cy attribute.
    //  * @example cy.dataCy('greeting')
    //  */
    dataCy(value: string): Chainable<Element>
    /**
     * command to select DOM element by id attribute.
     * @example cy.id('selector')
     */
    id(value: string): Chainable<Element>

    /**
     * Custom command to get navItem by name
     * @example cy.getNavItem(name: string)
     */
    getNavItem(name: string): Chainable<Element>

    /**
     * Custom command to get Input by name
     * @example cy.getInputByName(name: string)
     */
    getInputByName(fieldType: string, name: string, force?: boolean): Chainable<Element>

    /**
     * Custom command to get Table in a module
     * @example cy.getTableInModule(element: string = 'summary', moduleName: string)
     * */
    getTableInModule(element: string, moduleName?: string): Chainable<Element>

    /**
     * Custom command to get Tab
     * @example cy.getTab(tabName: string, contains: string, element: string = 'details')
     */
    getTab(tabName: string, contains: string, element: string): Chainable<Element>

    // PAGES

    /**
     * Custom command by which go to View page through items in List page
     * @example cy.goToViewThroughList(listPage: string, listPageTitle: string)
     */
    goToViewThroughList(listPage: string, listPageTitle: string): Chainable<Element>

    /**
     * Custom command by which go to View page through offCanvas click in List page
     * @example cy.goToViewThroughListOffCanvas(listPage: string, listPageTitle: string)
     */
    goToViewThroughListOffCanvas(listPage: string, listPageTitle: string): Chainable<Element>

    /**
     * Custom command to test layout
     * @example cy.testLayout()
     */
    testLayout(): Chainable<Element>

    /**
     * Custom command to test List Page
     * @example cy.testListPage(page, clickOnFirstRow = false, element)
     */
    testListPage(page: string, clickOnFirstRow?: boolean, element?: string): Chainable<Element>

    /**
     * Custom command to test View Page
     * @example cy.testViewPage(title: string = 'Details', el: string = 'summary')
     */
    testViewPage(title: string, el: string): Chainable<Element>

    /**
     * Custom command to Login
     * @example cy.login(email?: string, password?: string)
     */
    login(email: string, password: string): Chainable<Element>

    /**
     * Custom command to get IUI Tile
     * @example cy.getTile({tile: string, url?: string, timer?: number})
     */
    getTile({
      tile,
      url,
      timer
    }: {
      tile: string
      url?: string
      timer?: number
    }): Chainable<Element>

    /**
     * Custom command to test Calendar
     * @example cy.testCalendar(timer?:number=1000)
     */
    testCalendar(timer?: number): Chainable<Element>

    /**
     * Custom command to test Dropdown NavItem
     * @example cy.getDropdownNavItem( item: string,itemList: string[] = [],timer: number = 1000)
     */
    getDropdownNavItem(item: string, itemList?: string[], timer?: number): Chainable<Element>
  }
} // eslint-disable-next-line @typescript-eslint/no-namespace
