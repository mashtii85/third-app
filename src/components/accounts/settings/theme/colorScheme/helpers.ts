/**
 * Components - Accounts - Settings - Theme - Helpers
 *
 */

// Styled Components
import styled from 'styled-components'

export const fields = [
  {
    title: 'Colours',
    value: 'COLOUR',
    items: [
      {
        title: 'Primary',
        value: 'primary'
      },
      {
        title: 'Secondary',
        value: 'secondary'
      },
      {
        title: 'Success',
        value: 'success'
      },
      {
        title: 'Info',
        value: 'info'
      },
      {
        title: 'Warning',
        value: 'warning'
      },
      {
        title: 'Danger',
        value: 'danger'
      },
      {
        title: 'Dark',
        value: 'dark'
      },
      {
        title: 'Light',
        value: 'light'
      }
    ]
  },
  {
    title: 'Navbar',
    value: 'NAVBAR',
    items: [
      {
        title: 'Background',
        value: 'background'
      },
      {
        title: 'Top border',
        value: 'borderTopColor'
      },
      {
        title: 'Active colour',
        value: 'colourActive'
      },
      {
        title: 'Caret hover colour',
        value: 'caretColourHover'
      },
      {
        title: 'Dropdown active',
        value: 'dropdownActive'
      },
      {
        title: 'Dropdown background',
        value: 'dropdownBackground'
      },
      {
        title: 'Dropdown hover background',
        value: 'dropdownBackgroundHover'
      },
      {
        title: 'Dropdown colour',
        value: 'dropdownColour'
      },
      {
        title: 'Dropdown hover colour',
        value: 'dropdownColourHover'
      },
      {
        title: 'Overlay background',
        value: 'backgroundOverlay'
      },
      {
        title: 'Toggler',
        value: 'colourToggler'
      },
      {
        title: 'Link color',
        value: 'colourDefault'
      },
      {
        title: 'Desktop link color',
        value: 'colourDefaultDesktop'
      },
      {
        title: 'List item background',
        value: 'backgroundHoverListItem'
      }
    ]
  }
]

export const StyledField = styled.div`
  align-items: center;
  display: flex;
  margin-top: 3px;
  margin-bottom: 5px;
`

export const StyledColour = styled.div`
  background-color: ${({ color }) => color};
  border: 1px solid #ddd;
  height: 1rem;
  margin-right: 0.25rem;
  width: 1rem;
`
