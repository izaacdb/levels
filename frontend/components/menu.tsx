import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

const Container = styled.ul`
  
`
const Row = styled.li`
 
`


type Props = {}

const Menu: FunctionComponent<Props> = () => {
  return (
    <Container>
      <Row>I'm a menu</Row>
    </Container>
  )
}


export default Menu
