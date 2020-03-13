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
    //border: 1px solid #192222;
    box-shadow: none;
    border: 1px solid #466b6c;
    border-radius: 0;
  }
  .react-datepicker__header{
    background-color: #192121;
    border-bottom: 1px solid #233130;
  }
  .react-datepicker__day{
    color: #f0f0f0;
    outline:none;
    border-radius: 0;
    &:hover{
      background-color: #476c6c;
      border-color: #476c6c;
      color: #f0f0f0;
      border-radius: 0;
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
    cursor: pointer;
    width: 8rem;
    background: #171717;
    border: 1px solid #233130;
    padding: 0.5rem;
    color: #f0f0f0;
    box-shadow: none;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.8rem;
    caret-color: transparent;
    &:hover{
      border-color: #476c6c;
    }
  }
  .react-datepicker-ignore-onclickoutside{
    border-color: #476c6c!important;
  }
  .graph-type-label + div{
    display:inline-block;
  }
  .header-label{
    display: inline-block;
    @media (max-width: 799px){
      min-width:5rem;
    }
    @media (min-width: 800px){
      margin-right: 1rem;
    }
    + div {
      margin-right: 1rem;
    }
  }
`
