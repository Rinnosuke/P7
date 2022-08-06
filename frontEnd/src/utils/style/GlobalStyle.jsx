import { createGlobalStyle } from 'styled-components'
import colors from './colors'

const StyledGlobalStyle = createGlobalStyle`
    * {
      font-family: 'Lato', 'Trebuchet MS', Helvetica, sans-serif;
    }

    body {
        margin: 0;
        background-color: ${colors.tertiary};
    }
`

function GlobalStyle() {
  return <StyledGlobalStyle />
}

export default GlobalStyle
