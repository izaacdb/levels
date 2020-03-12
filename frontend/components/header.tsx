import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { ReduxState } from '../redux'
import { getReadingsThunk } from '../redux/actions'
import { Reading } from '../redux/api'

const H1 = styled.h1`
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
  padding: 0;
`
const H2 = styled.h2`
  font-size: 0.8rem;
  font-weight: normal;
  margin: 0 0 1rem;
  padding: 0;
`
const Container = styled.div`
  margin: 1rem 0;
`
const Col = styled.li`
  color: #ccc;
  display: inline-block;
  margin: 0 1rem 0 0;
`

const Nav = styled.ul``

type Props = {
  ready: boolean
  readings: Reading[]
}

const Header: FunctionComponent<Props> = ({ ready, readings }) => {
  return (

    <Container>
      <H1>Levels</H1>
      <H2>Latest CGM reading: {ready ? new Date(readings[readings.length - 1].date).toUTCString() : 'Loading'}</H2>
      <Nav>
        <Col>Some dropdown</Col>
        <Col>Some dropdown</Col>
        <Col>Some dropdown</Col>
      </Nav>
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
)(Header)

