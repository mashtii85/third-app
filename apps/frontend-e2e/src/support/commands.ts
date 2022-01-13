import { getDetails2 } from './commands/details'
import { getFilterComponent } from './commands/filter'
import { offCanvasCheckHeader, offCanvasClose, offCanvasVisible } from './commands/offCanvas'
import {
  addNewCondition,
  datepicker,
  formCheckbox,
  formRadio,
  formReactSelect,
  formReactSelectByTyping,
  formSelect,
  reactSelectWorkflows,
  formSubmitButton,
  formTextarea,
  formTextInput,
  hasField
} from './commands/form'

import {
  dataCy,
  getDropdownNavItem,
  getInputByName,
  getNavItem,
  getTab,
  getTableInModule,
  getTile,
  id,
  testCalendar
} from './commands/selectors'

import {
  goToViewThroughList,
  goToViewThroughListOffCanvas,
  testLayout,
  testListPage,
  testViewPage
} from './commands/pages'
import { login } from './commands/auth'

Cypress.Commands.add('dataCy', dataCy)

Cypress.Commands.add('id', id)

Cypress.Commands.add('getFilterComponent', getFilterComponent)

Cypress.Commands.add('getDetails2', getDetails2)

Cypress.Commands.add('offCanvasCheckHeader', offCanvasCheckHeader)

Cypress.Commands.add('offCanvasClose', offCanvasClose)

Cypress.Commands.add('offCanvasVisible', offCanvasVisible)

// FORMS
Cypress.Commands.add('hasField', hasField)

Cypress.Commands.add('formReactSelect', formReactSelect)

Cypress.Commands.add('formReactSelectByTyping', formReactSelectByTyping)

Cypress.Commands.add('formSubmitButton', formSubmitButton)

Cypress.Commands.add('formTextarea', formTextarea)

Cypress.Commands.add('formTextInput', formTextInput)

Cypress.Commands.add('formCheckbox', formCheckbox)

Cypress.Commands.add('formSelect', formSelect)

Cypress.Commands.add('datepicker', datepicker)

Cypress.Commands.add('formRadio', formRadio)

Cypress.Commands.add('addNewCondition', addNewCondition)

Cypress.Commands.add('reactSelectWorkflows', reactSelectWorkflows)

// SELECTORS
Cypress.Commands.add('getNavItem', getNavItem)

Cypress.Commands.add('getInputByName', getInputByName)

Cypress.Commands.add('getTableInModule', getTableInModule)

Cypress.Commands.add('getTab', getTab)

// PAGES
Cypress.Commands.add('goToViewThroughList', goToViewThroughList)

Cypress.Commands.add('goToViewThroughListOffCanvas', goToViewThroughListOffCanvas)

Cypress.Commands.add('testLayout', testLayout)

Cypress.Commands.add('testListPage', testListPage)

Cypress.Commands.add('testViewPage', testViewPage)

// AUTH
Cypress.Commands.add('login', login)

Cypress.Commands.add('getTile', getTile)

Cypress.Commands.add('testCalendar', testCalendar)

Cypress.Commands.add('getDropdownNavItem', getDropdownNavItem)
