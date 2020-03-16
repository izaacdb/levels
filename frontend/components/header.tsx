import React, { FunctionComponent } from 'react'
import Select from 'react-select'
import styled from 'styled-components'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import { addDays, getTime, subDays } from 'date-fns'
import { GraphType, graphOptions, GraphValues, ReduxState, timeOptions } from '../redux'
import { Reading } from '../services/api'
import { reactSelectStyles, white } from './styles'
import {
  settingsEndDateChangeThunk,
  settingsEndTimeChangeThunk,
  settingsGraphChangeThunk,
  settingsStartDateChangeThunk,
  settingsStartTimeChangeThunk
} from '../redux/thunks'

const dbStartDate = new Date(1579621683063)
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
  startTime: number
  endTime: number
  graphType: GraphType
  settingsStartChangeThunk: typeof settingsStartDateChangeThunk
  settingsEndChangeThunk: typeof settingsEndDateChangeThunk
  settingsStartTimeChangeThunk: typeof settingsStartTimeChangeThunk
  settingsEndTimeChangeThunk: typeof settingsEndTimeChangeThunk
  settingsGraphChangeThunk: typeof settingsGraphChangeThunk
}

const handleDateChangeRaw = e => {
  e.preventDefault()
}

const Header: FunctionComponent<Props> = ({
  ready,
  readings,
  startDate,
  endDate,
  startTime,
  endTime,
  graphType,
  settingsStartChangeThunk,
  settingsEndChangeThunk,
  settingsStartTimeChangeThunk,
  settingsEndTimeChangeThunk,
  settingsGraphChangeThunk
}) => {
  console.log(startDate)
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
            selected={startDate}
            onChange={(date: Date) => {
              settingsStartChangeThunk({ startDate: getTime(date), endDate: getTime(endDate), startTime, endTime })
            }}
            onChangeRaw={handleDateChangeRaw}
            dateFormat={dateFormat}
            maxDate={subDays(new Date(), 1)}
            minDate={dbStartDate}
          />
        </Col>
        <Col>
          <DateLabel>End date:</DateLabel>
          <DatePicker
            showPopperArrow={false}
            selected={endDate}
            onChange={date => {
              settingsEndChangeThunk({ startDate: getTime(startDate), endDate: getTime(date), startTime, endTime })
            }}
            onChangeRaw={handleDateChangeRaw}
            dateFormat={dateFormat}
            minDate={addDays(startDate, 1)}
            maxDate={new Date()}
          />
        </Col>
        <Col>
          <TypeLabel>Graph type:</TypeLabel>
          <Select
            instanceId="graphType"
            isSearchable={false}
            styles={reactSelectStyles}
            options={graphOptions}
            value={graphType}
            onChange={selection => {
              settingsGraphChangeThunk(
                { startDate: getTime(startDate), endDate: getTime(endDate), startTime, endTime },
                selection
              )
            }}
          />
        </Col>
      </Nav>
      {graphType.value === GraphValues.aggregate && (
        <Nav>
          <Col>
            <TypeLabel>Start time:</TypeLabel>
            <Select
              instanceId="startTime"
              isSearchable={false}
              styles={reactSelectStyles}
              options={timeOptions}
              value={timeOptions[startTime]}
              onChange={selection => {
                settingsStartTimeChangeThunk({
                  startDate: getTime(startDate),
                  endDate: getTime(endDate),
                  startTime: selection.value,
                  endTime
                })
              }}
            />
          </Col>
          <Col>
            <TypeLabel>End time:</TypeLabel>
            <Select
              instanceId="endTime"
              isSearchable={false}
              styles={reactSelectStyles}
              options={timeOptions}
              value={timeOptions[endTime]}
              onChange={selection => {
                settingsEndTimeChangeThunk({
                  startDate: getTime(startDate),
                  endDate: getTime(endDate),
                  startTime,
                  endTime: selection.value
                })
              }}
            />
          </Col>
        </Nav>
      )}
    </Container>
  )
}

function mapStateToProps(state: ReduxState) {
  console.log('header')
  console.log(state.settings)
  return {
    ready: state.readings?.data?.length > 0 && !state.readings.pending,
    readings: state.readings?.data,
    ...state.settings
  }
}

const mapDispatchToProps = {
  settingsStartChangeThunk: settingsStartDateChangeThunk,
  settingsEndChangeThunk: settingsEndDateChangeThunk,
  settingsStartTimeChangeThunk: settingsStartTimeChangeThunk,
  settingsEndTimeChangeThunk: settingsEndTimeChangeThunk,
  settingsGraphChangeThunk: settingsGraphChangeThunk
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
