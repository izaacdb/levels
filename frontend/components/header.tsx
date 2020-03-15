import React, { FunctionComponent } from 'react'
import Select from 'react-select'
import styled from 'styled-components'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import { GraphType, ReduxState } from '../redux'
import { Reading } from '../services/api'
import { reactSelectStyles, white } from './styles'
import { settingsEndChangeThunk, settingsStartChangeThunk } from '../redux/thunks'

const dbStart = 1579621683063
const oneDay = 60 * 60 * 24 * 1000
const dateFormat = 'dd / MM / yy'

const H1 = styled.h1`
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
  padding: 0;
`
const H2 = styled.h2`
  font-size: 0.8rem;
  font-weight: normal;
  margin: 0 0 1rem;
  padding: 0;
`
const Container = styled.div`
  margin: 1rem 0 0;
`
const Col = styled.li`
  color: ${white};
  margin: 0 1rem 1rem 0;
  @media (min-width: 800px) {
    display: inline-block;
  }
`

const DateLabel = styled.label`
  display: inline-block;
  @media (max-width: 799px) {
    min-width: 5rem;
  }
  @media (min-width: 800px) {
    margin-right: 1rem;
  }
  + div {
    margin-right: 1rem;
  }
`
const TypeLabel = styled(DateLabel)`
  + div {
    display: inline-block;
  }
`

const Nav = styled.ul``

type Props = {
  ready: boolean
  readings: Reading[]
  startDate: number
  endDate: number
  graphType: GraphType
  settingsStartChangeThunk: typeof settingsStartChangeThunk
  settingsEndChangeThunk: typeof settingsEndChangeThunk
}

const handleDateChangeRaw = e => {
  e.preventDefault()
}

const graphOptions = [
  { value: 'linear', label: 'Linear graph' },
  { value: 'overlayDays', label: 'Overlay days' },
  { value: 'overlayWeeks', label: 'Overlay weeks' },
  { value: 'meanAverage', label: 'Mean average' }
]

const getGraphType =(graphType: GraphType) => {
  switch(graphType){
    case GraphType.Linear:
    case GraphType.MeanAverage:
    case GraphType.OverlayDays:
    case GraphType.OverlayWeeks:
    default:
      return { value: 'linear', label: 'Linear graph' }
  }
}

const Header: FunctionComponent<Props> = ({
  ready,
  readings,
  startDate,
  endDate,
  graphType,
  settingsStartChangeThunk,
  settingsEndChangeThunk
}) => {
  const graphValue = getGraphType(graphType)

  return (
    <Container>
      <H1>Levels</H1>
      <H2>
        {ready
          ? `Latest CGM reading: ${new Date(readings[readings.length - 1].date).toUTCString()}`
          : 'Loading data, please wait'}
      </H2>

      <Nav>
        <Col>
          <DateLabel>Start date:</DateLabel>
          <DatePicker
            showPopperArrow={false}
            selected={new Date(startDate)}
            onChange={date => {
              settingsStartChangeThunk(date.getTime(), endDate)
            }}
            onChangeRaw={handleDateChangeRaw}
            dateFormat={dateFormat}
            maxDate={new Date(endDate - oneDay)}
            minDate={new Date(dbStart)}
          />
        </Col>
        <Col>
          <DateLabel>End date:</DateLabel>
          <DatePicker
            showPopperArrow={false}
            selected={new Date(endDate)}
            onChange={date => {
              settingsEndChangeThunk(startDate, date.getTime())
            }}
            onChangeRaw={handleDateChangeRaw}
            dateFormat={dateFormat}
            minDate={new Date(startDate + oneDay)}
            maxDate={new Date()}
          />
        </Col>
        <Col>
          <TypeLabel>Graph type:</TypeLabel>
          <Select instanceId="graphType" isSearchable={false} styles={reactSelectStyles} options={graphOptions} value={graphValue}/>
        </Col>
      </Nav>
    </Container>
  )
}

function mapStateToProps(state: ReduxState) {
  return {
    ready: state.readings?.data?.length > 0 && !state.readings.pending,
    readings: state.readings?.data,
    ...state.settings
  }
}

const mapDispatchToProps = { settingsStartChangeThunk, settingsEndChangeThunk }

export default connect(mapStateToProps, mapDispatchToProps)(Header)
