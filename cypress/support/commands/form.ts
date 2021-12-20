/**
 * Cypress - Commands - Form
 */

// import { getDateValues } from '../../helpers/form'

const addNewCondition = (): any =>
  cy.get('button[name="automatedWorkflow.addNewCondition"]').click()

const datepicker = (
  placeholder: string,
  selectTime: boolean = false,
  fieldName: string = null,
  dateValue: string = null
): any => {
  const getString = fieldName ? `input[name="${fieldName}"]` : `input[placeholder="${placeholder}"]`
  // @ts-ignore: Unreachable code error
  cy.get(getString, { force: true })
    .click({ force: true })
    .then(() => {
      if (!dateValue) {
        return cy.get('[class*="react-datepicker__day--today"]').click()
      } else {
        // const { weekday, month, day, year } = getDateValues(dateValue)
        // return cy.get(`div[aria-label="Choose ${weekday}, ${month} ${day}, ${year}"]`).click({
        //   force: true
        // })
      }
      if (selectTime) {
        return cy
          .get('[class*="react-datepicker__time-list-item"]')
          .contains('12:00 AM')
          .click({ force: true })
      }
    })
}

const formCheckbox = (name: string): any =>
  cy.get(`input[name="${name}"][type="checkbox"]`).scrollIntoView()

const formRadio = (
  name: string,
  value: string,
  force: boolean = false
): any => // @ts-ignore: Unreachable code error
  cy
    .get(`input[name="${name}"][type="radio"]`, { force })
    .parent()
    .contains(value)
    .click({ force: force })

const formReactSelect = (name: string, optionIndex: number, force?: boolean): any =>
  // @ts-ignore: Unreachable code error
  cy
    .get(`label[for="${name}"]`, { force })
    .children()
    .eq(1)
    .click({ force })
    .then(() => {
      cy.get(`[id*="option-${optionIndex}"]`).click({ force })
    })

const formReactSelectByTyping = (name: string, optionName: string): any =>
  cy.get(`label[for="${name}"] input`).first().focus().type(`${optionName}{enter}`)

const formSelect = (name: string, option: string, force: boolean = false): any =>
  cy.get(`select[name="${name}"]`).select(option, { force })

const reactSelectWorkflows = (fieldName: string, optionIndex: number): any =>
  cy
    .get(fieldName)
    .click()
    .then(() => {
      cy.get(`div[id$="${optionIndex}"]`).first().click()
    })

const formSubmitButton = (): any => cy.get('button[type="submit"]').click()

const formTextarea = (name: string, text: string, force: boolean = false): any =>
  cy.get(`textarea[name="${name}"]`).type(text, { force })

const formTextInput = (name: string, text: string, force: boolean = false): any =>
  cy.get(`input[name="${name}"]`).clear().type(text, { force })

const hasField = (fieldType: string, name: string, force: boolean = false): any => {
  switch (fieldType) {
    case 'select':
      // @ts-ignore: Unreachable code error
      return cy
        .get(`${fieldType}[name="${name}"]`, { force })
        .children()
        .should((children) => {
          if (children.length < 1) {
            throw new Error('Did not find at least1 element')
          }
        })
    case 'reactSelect':
      cy.get(`label[for="${name}"]`)
      // @ts-ignore: Unreachable code error
      return cy.get(`input[name="${name}"]`, { force })
    default:
      // @ts-ignore: Unreachable code error
      return cy.get(`${fieldType}[name="${name}"]`, { force })
  }
}

export {
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
}
