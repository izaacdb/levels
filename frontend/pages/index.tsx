import React, { FunctionComponent } from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '../redux'
import { getReadingsThunk } from '../redux/thunks'
import { Reading } from '../services/api'
import Graph from '../components/graph'
import Loading from '../components/loading'

type Props = {
  readings: Reading[]
  getReadingsThunk: typeof getReadingsThunk
  pending: boolean
  startDate: number
  endDate: number
}

const HomePage: FunctionComponent<Props> = ({ readings, getReadingsThunk, pending, startDate, endDate }) => {
  if (readings.length === 0 && !pending) {
    getReadingsThunk(startDate, endDate)
  }
  if (pending) {
    return <Loading />
  }

  return <Graph data={readings} margin={30} width={1024} height={360} />
}

function mapStateToProps(state: ReduxState) {
  return {
    readings: state.readings.data,
    pending: state.readings.pending,
    startDate: state.settings.startDate,
    endDate: state.settings.endDate
  }
}

const mapDispatchToProps = { getReadingsThunk }

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
