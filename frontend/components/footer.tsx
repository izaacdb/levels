import React, { FunctionComponent, useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { ReduxState } from '../redux'
import { Reading } from '../services/api'
import { cyan } from './styles'

const Container = styled.ul`
  margin: 1rem 0;
`

const Item = styled.li`
  margin: 0 0 1rem;
  @media (min-width: 800px) {
    margin-right: 2rem;
    display: inline-block;
  }
`

const Label = styled.label`
  margin-right: 0.5rem;
  @media (max-width: 799px) {
    display: inline-block;
    min-width: 7rem;
  }
`

const Value = styled.div`
  display: inline-block;
  border-bottom: 1px solid ${cyan};
  width: 2rem;
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

  const totalDeviation = readings.reduce((acc, r) => (acc += Math.pow(r.sgv - mean, 2)), 0)
  const variance = totalDeviation / readings.length
  const stdDev = Math.sqrt(variance)

  const hba1c = mean * 0.63 + 1.63

  const max = Math.max(...sgvs)
  const min = Math.min(...sgvs)

  const low = []
  const high = []
  readings.forEach(r => {
    if (r.sgv <= 4.5) {
      low.push(r.sgv)
    } else if (r.sgv >= 9) {
      high.push(r.sgv)
    }
  })

  return (
    <Container>
      {ready && (
        <>
          <Item>
            <Label>Mean:</Label>
            <Value>{mean.toFixed(1)}</Value>
          </Item>
          <Item>
            <Label>Maximum:</Label>
            <Value>{max.toFixed(1)}</Value>
          </Item>
          <Item>
            <Label>Minimum:</Label>
            <Value>{min.toFixed(1)}</Value>
          </Item>
          <br />
          <Item>
            <Label>Low readings:</Label>
            <Value>{((low.length / readings.length) * 100).toFixed(1)}%</Value>
          </Item>
          <Item>
            <Label>Normal readings:</Label>
            <Value>{(((readings.length - (high.length + low.length)) / readings.length) * 100).toFixed(1)}%</Value>
          </Item>
          <Item>
            <Label>High readings:</Label>
            <Value>{((high.length / readings.length) * 100).toFixed(1)}%</Value>
          </Item>
          <br />
          <Item>
            <Label>HbA1c (estimated):</Label>
            <Value>{hba1c.toFixed(1)}%</Value>
          </Item>
          <Item>
            <Label>Standard deviation:</Label>
            <Value>{stdDev.toFixed(1)}</Value>
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
