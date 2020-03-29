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

export const reactSelectStyles = {
  container: (provided, state) => ({
    ...provided,
    width: '8rem',
    marginRight: '1rem'
  }),
  control: (provided, state) => ({
    ...provided,
    backgroundColor: blackBg,
    borderColor: state.menuIsOpen ? cyan : selectBorder,
    borderRadius: 0,
    boxShadow: 'none',
    minHeight: 0,
    fontSize: '0.8rem',
    height: 33,
    width: 146,
    cursor: 'pointer',
    '&:hover': {
      borderColor: cyan
    },
    '>div': {
      padding: '0 0.5rem',
      height: '100%'
    }
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: white,
    fontSize: '0.8rem'
  }),
  indicatorsContainer: () => ({
    display: 'none'
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: white,
    margin: 0
  }),
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: selectBg,
    border: `1px solid ${teal}`,
    borderRadius: '0',
    width: 146,
    margin: '10px 0'
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? cyan : null,
    color: state.isSelected ? white : null,
    '&:hover': {
      backgroundColor: cyan,
      color: white,
      cursor: 'pointer'
    }
  }),
  menuList: (provided, state) => ({
    ...provided,
    padding: 0
  })
}

export const BaseStyles = createGlobalStyle`
  ${reset}
  *{
  box-sizing: border-box;
  }
  ::selection {
    background-color:${aqua};
  }
  body{
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
  .react-datepicker__day--disabled{
    color: ${teal};
    &:hover{
      background-color: initial;
      border-color: initial;
      color: ${teal};
      border-radius: initial;
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
    width: 9rem;
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
  
  .react-datepicker-wrapper{
    margin: 0
  }
  text{
    font-weight: 300;
  }
`
