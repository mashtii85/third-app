/**
 * Theme - LMS Admin
 */

const COLOUR = {
  dark: 'rgb(0, 55, 83)',
  light: 'rgb(236, 240, 243)',
  white: 'rgb(255, 255, 255)',
  black: 'rgb(0, 0, 0)',
  primary: 'rgba(203, 30, 50, 0.8)',
  softPrimary: '#FFA0AB',
  secondary: 'rgb(6, 121, 216)',
  success: 'rgb(0, 180, 60)',
  info: 'rgb(249, 156, 35)',
  warning: 'rgb(230, 8, 17)',
  danger: 'rgb(232, 9, 94)',
  lightRed: 'rgb(255, 88, 88)',
  opaqueRed: 'rgba(255, 97, 61 , 0.5)',
  darkText: '#666666',
  help: 'rgb(255, 222, 3)'
}

const COPYRIGHT = {
  background: COLOUR.dark,
  colour: '#999'
}

const FOOTER = {
  background: COLOUR.dark,
  colour: COLOUR.white
}

const NAVBAR = {
  // Navbar
  background: COLOUR.light,
  colourActive: COLOUR.dark,
  height: 'auto',

  // Borders
  borderTopColor: COLOUR.primary,

  // Caret
  caretColourHover: COLOUR.primary,

  // Dropdown
  dropdownActive: COLOUR.white,
  dropdownBackground: COLOUR.white,
  dropdownBackgroundHover: COLOUR.light,
  dropdownColour: COLOUR.dark,
  dropdownColourHover: COLOUR.dark,

  // Overlay
  backgroundOverlay: COLOUR.white,

  // Toggler
  colourToggler: COLOUR.dark,

  // Link
  colourDefault: COLOUR.dark,
  colourDefaultDesktop: COLOUR.dark,

  // ListItem
  backgroundHoverListItem: COLOUR.white
}

export const STEPPER = {
  colour: COLOUR.softPrimary,
  colourCheckMark: COLOUR.primary,
  colourDeactivated: COLOUR.dark,
  colourDate: '#CCCCCC',
  colourInfo: '#999999',
  colourContent: '#666666'
}

const TYPOGRAPHY = {
  font: 'Arial, sans-serif'
}

export const Theme = {
  COLOUR,
  COPYRIGHT,
  FOOTER,
  NAVBAR,
  STEPPER,
  TYPOGRAPHY
}
