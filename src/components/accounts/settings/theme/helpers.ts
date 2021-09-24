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
        title: 'Border',
        value: 'borderTopColor'
      },
      {
        title: 'Text Colour',
        value: 'colourActive'
      }
    ]
  },
  {
    title: 'Messaging',
    value: 'MESSAGING',
    items: [
      {
        title: 'Container Background',
        value: 'containerBackground'
      },
      {
        title: 'Header Background',
        value: 'headerBackground'
      },
      {
        title: 'Message Content Colour',
        value: 'messageContentColour'
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
