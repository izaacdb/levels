import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

const Container = styled.ul`
  
`
const Row = styled.li`
 
`


type Props = {}

const Nav: FunctionComponent<Props> = () => {
  return (
    <Container>
      <Row>I'm a nav</Row>
    </Container>
  )
}


export default Nav
