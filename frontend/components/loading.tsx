import styled, { keyframes } from 'styled-components'
import { blackBg, graphBorder, teal } from './styles'
import React from 'react'

const Container = styled.div`
  width: 100%;
  height: 360px;
  background-color: ${blackBg};
  border: 1px solid ${graphBorder};
  display: flex;
  justify-content: center;
  align-items: center;
`
const CubeMove = keyframes`
    25% { 
      transform: translateX(42px) rotate(-90deg) scale(0.5);
    } 50% { 
      transform: translateX(42px) translateY(42px) rotate(-179deg);
    } 50.1% { 
      transform: translateX(42px) translateY(42px) rotate(-180deg);
    } 75% { 
      transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    } 100% { 
      transform: rotate(-360deg);
    }
  
`
const Spinner = styled.div`
  margin: 100px auto;
  width: 40px;
  height: 40px;
  position: relative;
`
const Cube1 = styled.div`
  background-color: ${teal};
  width: 15px;
  height: 15px;
  position: absolute;
  top: 0;
  left: 0;
  animation: ${CubeMove} 1.8s infinite ease-in-out;
`
const Cube2 = styled(Cube1)`
  animation-delay: -0.9s;
`

const Loading = () => (
  <Container>
    <Spinner>
      <Cube1 />
      <Cube2 />
    </Spinner>
  </Container>
)

export default Loading
