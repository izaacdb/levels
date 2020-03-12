import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { ReduxState } from '../redux'
import { Reading } from '../redux/api'

const Container = styled.div`
  margin: 1rem 0;
`
type Props = {
  readings: Reading[]
}

const Footer: FunctionComponent<Props> = ({ readings }) => {
  const sgvs = readings.map(r => r.sgv)
  const total = readings.reduce((acc, r) => acc += r.sgv, 0)
  const mean = total / readings.length
  const max = Math.max(...sgvs)
  const min = Math.min(...sgvs)

  return (
    <Container>
      Mean average: {mean.toFixed(1)}<br />
      Maximum reading: {max.toFixed(1)}<br />
      Minimum reading: {min.toFixed(1)}
    </Container>
  )
}


function mapStateToProps(state: ReduxState) {
  return {
    ready: state.readings?.data?.length > 0 && !state.readings.pending,
    readings: state.readings?.data
  }
}

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer)

