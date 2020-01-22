import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import Menu from './menu'

const Title = styled.h1`
  width: 100vw;
  font-size: 2rem;
  margin: 10px;
`


type Props = {}

const Nav: FunctionComponent<Props> = () => {
  return (
    <Title>
      <Menu /> 22 / 01 / 2020
    </Title>
  )
}


export default Nav
