// screen size 4500px x 3000px
// 45000px / 100 = 45px
// 1vw = 45px
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

export const BaseStyles = createGlobalStyle`
  ${reset}
  
  body{
    font-family: 'IBM Plex Sans', sans-serif;
    background-color: #171717;
    color: #CCCCCC;
  }
`
