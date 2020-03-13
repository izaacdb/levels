import React, { FunctionComponent } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { ReduxState } from '../redux'
import { getReadingsThunk } from '../redux/actions'
import { Reading } from '../services/api'
import Graph from '../components/graph'

type Props = {
  readings: Reading[]
  getReadingsThunk: () => void
  pending: boolean
}

const Loading = styled.div`
  width: 100%;
  background-color: #171717;
  border: 1px solid #223130;
  display: flex;
  justify-content: center;
  align-items: center;
`

const GraphWrapper = styled.div`
  width: 100%;
  overflow: scroll;
  background-color: #171717;
  border: 1px solid #223130;
`

const HomePage: FunctionComponent<Props> = ({ readings, getReadingsThunk, pending }) => {
  if (readings.length === 0 && !pending) {
    getReadingsThunk()
  }
  if (pending) {
    return (
      <Loading>
        <div className="spinner">
          <div className="cube1" />
          <div className="cube2" />
        </div>
      </Loading>
    )
  }

  return (
    <GraphWrapper>
      <Graph data={readings} margin={30} width={1024} height={360} />
    </GraphWrapper>
  )
}

function mapStateToProps(state: ReduxState) {
  return {
    readings: state.readings.data,
    pending: state.readings.pending
  }
}

const mapDispatchToProps = { getReadingsThunk }

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
