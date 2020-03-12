import React, { FunctionComponent } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { ReduxState } from '../redux'
import { getReadingsThunk } from '../redux/actions'
import { Reading } from '../redux/api'
import Graph from '../components/graph'

type Props = {
  readings: Reading[]
  getReadingsThunk: () => void
  pending: boolean
}

const GraphWrapper = styled.div`
  width: 100%;
  overflow: scroll;
  background-color: #171717;
  border: 1px solid #223130;
  //box-sizing: border-box;
`

const HomePage: FunctionComponent<Props> = ({ readings, getReadingsThunk, pending }) => {
  if (readings.length === 0 && !pending) {
    getReadingsThunk()
  }
  if (pending) {
    return <div>Loading...</div>
  }

  return (
    <GraphWrapper>
      <Graph data={readings}
             margin={30}
             width={1024}
             height={360} />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)
