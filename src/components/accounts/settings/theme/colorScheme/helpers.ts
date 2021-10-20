/**
 * Components - Accounts - Settings - Theme - Helpers
 *
 */

// Styled Components
import styled from 'styled-components'

// UI
import { Dropdown, THEME_COLOUR_LIST } from '@drykiss/industry-ui'

export const fields = [
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

export const colours = [...THEME_COLOUR_LIST].slice(0, -1)

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

export const StyledDropdown = styled(Dropdown)`
  margin-right: 1rem;
  .dropdown--toggle {
    color: rgb(0, 55, 83);
  }
  .dropdown--menu {
    min-width: 14rem;
  }
  .dropdown--menu div {
    display: inline-block;
  }
  .dropdown--link {
    padding: 0.15rem 0.4rem;
  }
`
