import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

export const BaseStyles = createGlobalStyle`
  ${reset}
  body{
    box-sizing: border-box;
    font-family: 'IBM Plex Sans', sans-serif;
    background-color: #171717;
    color: #f0f0f0;
    line-height: 1.4;
    font-size: 0.8rem;
  }
  textarea, select, input, button { outline: none; }
  .react-datepicker{
    background-color: #212e2e;
    color: #fff;
    border: 1px solid #192222;
    box-shadow: none
  }
  .react-datepicker__header{
    background-color: #192121;
    border-bottom: 1px solid #233130;
  }
  .react-datepicker__day{
    color: #f0f0f0;
    outline:none;
    &:hover{
      background-color: #476c6c;
      border-color: #476c6c;
      color: #f0f0f0;
    }
  }
  .react-datepicker__current-month{
    color: #f0f0f0;
    font-size:0.8rem;
    font-family: 'IBM Plex Sans', sans-serif;
  }
  .react-datepicker__day-name{
    color: #f0f0f0;
    font-size:0.8rem;
    font-family: 'IBM Plex Sans', sans-serif;
  }
  .react-datepicker__day--selected{
    background-color: #476c6c;
    border-color: #476c6c;
  }
  .react-datepicker__input-container input{
    width: 8rem;
    background: #171717;
    border: 1px solid #233130;
    padding: 0.5rem;
    color: #f0f0f0;
    box-shadow: none;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.8rem;
    &:hover{
      border-color: #476c6c;
    }
  }
`
