import React, { FunctionComponent, useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { ReduxState } from '../redux'
import { Reading } from '../services/api'

const Container = styled.ul`
  margin: 1rem 0;
`

const Item = styled.li`
  margin: 0 0 1rem;
  @media (min-width: 800px) {
    margin-right: 1rem;
    display: inline-block;
  }
`

const Label = styled.label`
  margin-right: 1rem;
  @media (max-width: 799px) {
    display: inline-block;
    min-width: 7rem;
  }
`

const Value = styled.div`
  display: inline-block;
  border-bottom: 1px solid #476c6c;
  width: 1.75rem;
  text-align: center;
`

type Props = {
  readings: Reading[]
  ready: boolean
}

const Footer: FunctionComponent<Props> = ({ readings, ready }) => {
  const sgvs = readings.map(r => r.sgv)
  const total = readings.reduce((acc, r) => (acc += r.sgv), 0)
  const mean = total / readings.length
  const max = Math.max(...sgvs)
  const min = Math.min(...sgvs)

  return (
    <Container>
      {ready && (
        <>
          <Item>
            <Label>Mean average:</Label>
            <Value>{mean.toFixed(1)}</Value>
          </Item>
          <Item>
            <Label>Maximum reading:</Label>
            <Value>{max.toFixed(1)}</Value>
          </Item>
          <Item>
            <Label>Minimum reading:</Label>
            <Value>{min.toFixed(1)}</Value>
          </Item>
        </>
      )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
