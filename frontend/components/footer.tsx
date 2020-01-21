import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

const Container = styled.ul`
  
`
const Row = styled.li`
 
`

type Props = {}

const Footer: FunctionComponent<Props> = () => {
  return (
    <Container>
      <Row>I'm a footer</Row>
    </Container>
  )
}


export default Footer
