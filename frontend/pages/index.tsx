import React, { FunctionComponent } from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '../redux'
import { getReadingsThunk } from '../redux/actions'
import { Reading } from '../redux/api'
import Graph from '../components/graph'

type Props = {
  readings: Reading[]
  getReadingsThunk: () => void
}

const HomePage: FunctionComponent<Props> = ({ readings, getReadingsThunk }) => {
  if (readings.length === 0) {
    getReadingsThunk()
  }
  return (
    <Graph data={readings} margin={30} width={process.browser ? window.innerWidth : 500} height={500} />
  )
}

function mapStateToProps(state: ReduxState) {
  return {
    readings: state.readings.data
  }
}

const mapDispatchToProps = { getReadingsThunk }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)
