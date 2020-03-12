import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

export const BaseStyles = createGlobalStyle`
  ${reset}
  body{
    box-sizing: border-box;
    font-family: 'IBM Plex Sans', sans-serif;
    background-color: #171717;
    color: #CCCCCC;
    line-height: 1.4;
    font-size: 0.8rem;
  }
`
