/**
 * Theme - LMS Admin
 */

const COLOUR = {
  dark: 'rgb(0, 55, 83)',
  light: 'rgb(236, 240, 243)',

  white: 'rgb(255, 255, 255)',
  black: 'rgb(0, 0, 0)',

  primary: 'rgb(204, 31, 51)',
  secondary: 'rgb(6, 121, 216)',
  success: 'rgb(0, 180, 60)',
  info: 'rgb(249, 156, 35)',
  warning: 'rgb(230, 8, 17)',
  danger: 'rgb(232, 9, 94)',

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
  colour: COLOUR.primary,
  colourCheckmark: COLOUR.white
}

const TYPOGRAPHY = {
  font: 'Arial, sans-serif'
}

const TILE = {
  FONT_SIZE_TITLE: {
    xxs: '0.75rem',
    xs: '1rem',
    sm: '1.125rem',
    md: '1.25rem',
    lg: '1.5rem',
    xl: '1.75rem',
    xxl: '2rem',
    xxxl: '2.25rem'
  },
  FONT_SIZE_BODY: {
    xxs: '1.25rem',
    xs: '1.5rem',
    sm: '1.75rem',
    md: '2rem',
    lg: '2.25rem',
    xl: '2.5rem',
    xxl: '2.75rem',
    xxxl: '3rem'
  },
  PADDING: {
    xxs: '0.5rem',
    xs: '0.75rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '2.25rem',
    xxl: '2.5rem',
    xxxl: '3rem'
  },
  MIN_HEIGHT: {
    xxs: '50px',
    xs: '75px',
    sm: '100px',
    md: '150px',
    lg: '250px',
    xl: '300px',
    xxl: '350px',
    xxxl: '400px'
  }
}

export const Theme = {
  COLOUR,
  COPYRIGHT,
  FOOTER,
  NAVBAR,
  STEPPER,
  TYPOGRAPHY,
  TILE
}

export enum SIZE {
  XS = 'xs',
  LG = 'lg',
  SM = 'sm'
}
