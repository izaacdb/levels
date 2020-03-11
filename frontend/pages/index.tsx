import React, { FunctionComponent } from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '../redux'
import { getReadingsThunk } from '../redux/actions'
import { Reading } from '../redux/api'
import Graph from '../components/graph'

type Props = {
  readings: Reading[]
  getReadingsThunk: () => void
  pending: boolean
}


const HomePage: FunctionComponent<Props> = ({ readings, getReadingsThunk, pending }) => {
  if (readings.length === 0 && !pending) {
    getReadingsThunk()
  }
  if (pending) {
    return <div>Loading...</div>
  }

  return (
    <Graph data={readings}
           margin={30}
           width={process.browser ? window.innerWidth < 1024 ? window.innerWidth : 1024 : 500}
           height={360} />

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
