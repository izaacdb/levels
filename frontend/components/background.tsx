import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

const Stripes = styled.div`
  position: absolute;
  z-index: -1;
  display: grid;
  width: 100vw;
  top: 0;
  transform: skewY(-12deg);
  transform-origin: 0;
  background: linear-gradient(#171717 0,#192323 100%);
  grid: repeat(5, 200px) / repeat(10, 1fr);
  span:nth-child(1){
    grid-column: span 10;
    background: linear-gradient(100grad,#171717 30%,#243737);
  }
  span:nth-child(2){
    grid-area: 3 / span 4 / auto / -1;
    background: linear-gradient(100grad,#181d1d 10%,#192323);
  }
  span:nth-child(3) {
    grid-row: 4;
    grid-column: span 5;
    background: linear-gradient(100grad,#171717,#192323 150%);
  }
`

const Background: FunctionComponent = () => {
  return (
    <Stripes>
      <span />
      <span />
      <span />
    </Stripes>
  )
}

export default Background
