import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import Particles from 'react-particles-js'
import { blackBg, dark, dingy } from './styles'

const Stripes = styled.div`
  position: absolute;
  z-index: -1;
  display: grid;
  width: 100vw;
  top: 0;
  transform: skewY(-12deg);
  transform-origin: 0;
  background: linear-gradient(${blackBg} 0, ${dark} 100%);
  grid: repeat(5, 200px) / repeat(10, 1fr);
  span:nth-child(1) {
    grid-column: span 10;
    background: linear-gradient(100grad, ${blackBg} 30%, #243737);
  }
  span:nth-child(2) {
    grid-area: 3 / span 4 / auto / -1;
    background: linear-gradient(100grad, ${dingy} 10%, ${dark});
  }
  span:nth-child(3) {
    grid-row: 4;
    grid-column: span 5;
    background: linear-gradient(100grad, ${blackBg}, ${dark} 150%);
  }
`

const Background: FunctionComponent = () => {
  return (
    <>
      <Particles
        style={{position: 'absolute', width: '100%', height: '100%'}}
        params={{
          particles: {
            line_linked: {
              enable: false
            }
          }
        }}
      />
      <Stripes>
        <span />
        <span />
        <span />
      </Stripes>
    </>
  )
}

export default Background
