import React, { FunctionComponent } from 'react'
import { connect } from 'react-redux'
import { GraphType, GraphValues, ReduxState } from '../redux'
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
  graphType: GraphType
}

const HomePage: FunctionComponent<Props> = ({ readings, getReadingsThunk, pending, options, graphType }) => {
  if (readings.length === 0 && !pending) {
    getReadingsThunk(options)
  }
  if (pending) {
    return <Loading />
  }

  switch (graphType.value) {
    case GraphValues.aggregate:
      return <DayGraph data={readings} margin={30} width={1024} height={360} options={options} />
    case GraphValues.linear:
    default:
      return <Graph data={readings} margin={30} width={1024} height={360} options={options} />
  }
}

function mapStateToProps(state: ReduxState) {
  return {
    graphType: state.settings.graphType,
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
