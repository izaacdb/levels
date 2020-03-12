import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin: 1rem 0;
`
type Props = {}

const Footer: FunctionComponent<Props> = () => {
  return (
    <Container>
      Mean average: <br/>
      Maximum reading: <br/>
      Minimum reading:
    </Container>
  )
}


export default Footer
