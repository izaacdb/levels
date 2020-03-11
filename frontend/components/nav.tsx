import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { ReduxState } from '../redux'
import { getReadingsThunk } from '../redux/actions'
import { Reading } from '../redux/api'

const H1 = styled.h1`
  margin: 0;
  padding: 0;
  font-weight: bold;
`
const H2 = styled(H1)`
  font-weight: normal;
`
const Container = styled.ul`
  margin: 1rem 0;
`
const Col = styled.li`
  color: #ccc;
  font-size:1rem;
  display: inline-block;
  margin: 0 1rem 0 0;
`

type Props = {
  ready: boolean
  readings: Reading[]
}

const Nav: FunctionComponent<Props> = ({ready, readings}) => {
  return (

    <Container>
      <H1>Decks</H1>
      <H2>Latest CGM reading: {ready ? new Date(readings[readings.length - 1].date).toUTCString() : 'Loading'}</H2>
      <Col>Some dropdown</Col>
      <Col>Some dropdown</Col>
      <Col>Some dropdown</Col>
    </Container>

  )
}


function mapStateToProps(state: ReduxState) {
  return {
    ready: state.readings?.data?.length > 0 && !state.readings.pending,
    readings: state.readings?.data
  }
}

const mapDispatchToProps = { getReadingsThunk }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav)

