import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100vw;
  font-size: 1rem;
  margin: 10px;
`
type Props = {}

const Footer: FunctionComponent<Props> = () => {
  return (
    <Container>
      Footer contents
    </Container>
  )
}


export default Footer
