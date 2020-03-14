import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

export const white = '#f0f0f0'
export const blackBg = '#171717'
export const offBlackBg = '#1a2322'
export const selectBg = '#212e2e'
export const selectHeadBg = '#192121'
export const selectBorder = '#233130'
export const teal = '#466b6c'
export const cyan = '#476c6c'
export const aqua = '#76a9a9'
export const dark = '#192323'
export const dingy = '#181d1d'
export const lowBorder = '#400d02'
export const low = '#ca0000'
export const lowDot = '#ff5722'
export const high = '#ffc107'
export const normalDot = '#00bcd4'
export const graphBorder = '#223130'

export const BaseStyles = createGlobalStyle`
  ${reset}
  ::selection {
    background-color:${aqua};
  }
  body{
    box-sizing: border-box;
    font-family: 'IBM Plex Sans', sans-serif;
    background-color: ${offBlackBg};
    color: ${white};
    line-height: 1.4;
    font-size: 0.8rem;
  }
  textarea, select, input, button { outline: none; }
  .react-datepicker{
    background-color: ${selectBg};
    color: ${white};
    box-shadow: none;
    border: 1px solid ${teal};
    border-radius: 0;
  }
  .react-datepicker__header{
    background-color: ${selectHeadBg};
    border-bottom: 1px solid ${selectBorder};
  }
  .react-datepicker__day{
    color: ${white};
    outline:none;
    border-radius: 0;
    &:hover{
      background-color: ${cyan};
      border-color: ${cyan};
      color: ${white};
      border-radius: 0;
    }
  }
  .react-datepicker__current-month{
    color: ${white};
    font-size:0.8rem;
    font-family: 'IBM Plex Sans', sans-serif;
  }
  .react-datepicker__day-name{
    color: ${white};
    font-size:0.8rem;
    font-family: 'IBM Plex Sans', sans-serif;
  }
  .react-datepicker__day--selected{
    background-color: ${cyan};
    border-color: ${cyan};
  }
  .react-datepicker__input-container input{
    cursor: pointer;
    width: 8rem;
    background: ${blackBg};
    border: 1px solid ${selectBorder};
    padding: 0.5rem;
    color: ${white};
    box-shadow: none;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.8rem;
    caret-color: transparent;
    &:hover{
      border-color: ${cyan};
    }
  }
  .react-datepicker-ignore-onclickoutside{
    border-color: ${cyan}!important;
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
  
  // loading animation
  .spinner {
    margin: 100px auto;
    width: 40px;
    height: 40px;
    position: relative;
  }

  .cube1, .cube2 {
    background-color: ${teal};
    width: 15px;
    height: 15px;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-animation: sk-cubemove 1.8s infinite ease-in-out;
    animation: sk-cubemove 1.8s infinite ease-in-out;
  }
  
  .cube2 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }
  
  @-webkit-keyframes sk-cubemove {
    25% { -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5) }
    50% { -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg) }
    75% { -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5) }
    100% { -webkit-transform: rotate(-360deg) }
  }
  
  @keyframes sk-cubemove {
    25% { 
      transform: translateX(42px) rotate(-90deg) scale(0.5);
      -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
    } 50% { 
      transform: translateX(42px) translateY(42px) rotate(-179deg);
      -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
    } 50.1% { 
      transform: translateX(42px) translateY(42px) rotate(-180deg);
      -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
    } 75% { 
      transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
      -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    } 100% { 
      transform: rotate(-360deg);
      -webkit-transform: rotate(-360deg);
    }
  }
  
  text{
    font-weight: 300;
  }
`
