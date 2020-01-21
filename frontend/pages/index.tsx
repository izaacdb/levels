import React, { FunctionComponent } from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '../redux'
import { getReadingsThunk } from '../redux/thunks'

type Props = {
  readings: string[]
  getReadingsThunk: () => void
}

const HomePage: FunctionComponent<Props> = ({ readings, getReadingsThunk }) => {
  if(readings.length === 0){
    getReadingsThunk()
  }
  return <>
    <p>Hello</p>
    <ul>
      <li>{JSON.stringify(readings)}</li>
    </ul>
  </>
}

function mapStateToProps(state: ReduxState) {
  return {
    readings: state.readings
  }
}

const mapDispatchToProps = { getReadingsThunk }
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)
