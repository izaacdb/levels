import React, { FunctionComponent } from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '../redux'
import { getReadingsThunk, Options } from '../redux/thunks'
import { Reading } from '../services/api'
import Graph from '../components/graph'
import DayGraph from '../components/day-graph'
import Loading from '../components/loading'

type Props = {
  readings: Reading[]
  getReadingsThunk: typeof getReadingsThunk
  pending: boolean
  options: Options
}

const HomePage: FunctionComponent<Props> = ({ readings, getReadingsThunk, pending, options }) => {
  if (readings.length === 0 && !pending) {
    getReadingsThunk(options)
  }
  if (pending) {
    return <Loading />
  }

  return <Graph data={readings} margin={30} width={1024} height={360} options={options} />
}

function mapStateToProps(state: ReduxState) {
  return {
    options: {
      startDate: state.settings.startDate,
      endDate: state.settings.endDate,
      startTime: state.settings.startTime,
      endTime: state.settings.endTime
    },
    readings: state.readings.data,
    pending: state.readings.pending
  }
}

const mapDispatchToProps = { getReadingsThunk }

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
