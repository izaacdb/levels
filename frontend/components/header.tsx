import React, { FunctionComponent } from 'react'
import Select from 'react-select'
import styled from 'styled-components'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import { addDays, getTime, subDays } from 'date-fns'
import { GraphType, graphOptions, GraphValues, ReduxState, startTimeOptions, endTimeOptions } from '../redux'
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
export const dateFormat = 'dd / MM / yy'

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
const Form = styled.form`
  margin: 1rem 0 0;
`
const Control = styled.li`
  color: ${white};
  margin: 0 1rem 1rem 0;
  min-width: 8rem;
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
`
const TypeLabel = styled(DateLabel)`
  + div {
    display: inline-block;
  }
`

const Row = styled.ul``

export type Props = {
  ready: boolean
  readings: Reading[]
  startDate: Date
  endDate: Date
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

export const Header: FunctionComponent<Props> = ({
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
  return (
    <Form data-testid="headerForm">
      <H1>Levels</H1>
      <H2>
        {ready
          ? `Latest CGM reading: ${new Date(readings[readings.length - 1].date).toUTCString()}`
          : 'Loading data, please wait'}
      </H2>

      <Row>
        <Control>
          <DateLabel htmlFor="startDate">Start date:</DateLabel>
          <DatePicker
            customInput={<input data-testid="startDate" type="text" />}
            name="startDate"
            id="startDate"
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
        </Control>
        <Control>
          <DateLabel htmlFor="endDate">End date:</DateLabel>
          <DatePicker
            customInput={<input data-testid="endDate" type="text" />}
            name="endDate"
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
        </Control>
        <Control>
          <TypeLabel htmlFor="graphType">Graph type:</TypeLabel>
          <div data-testid="graphType">
            <Select
              name="graphType"
              instanceId="graphType"
              isSearchable={false}
              styles={reactSelectStyles}
              options={graphOptions}
              value={graphType}
              onChange={selection => {
                settingsGraphChangeThunk(
                  { startDate: getTime(startDate), endDate: getTime(endDate), startTime: 0, endTime: 23 },
                  selection
                )
              }}
            />
          </div>
        </Control>
      </Row>
      {graphType.value === GraphValues.aggregate && (
        <Row>
          <Control>
            <TypeLabel htmlFor="startTime">Start time:</TypeLabel>
            <Select
              data-testid="startTime"
              label="startTime"
              instanceId="startTime"
              isSearchable={false}
              styles={reactSelectStyles}
              options={startTimeOptions.map(o => ({ ...o, isDisabled: endTime < o.value }))}
              value={startTimeOptions[startTime]}
              onChange={selection => {
                settingsStartTimeChangeThunk({
                  startDate: getTime(startDate),
                  endDate: getTime(endDate),
                  startTime: selection.value,
                  endTime
                })
              }}
            />
          </Control>
          <Control>
            <TypeLabel htmlFor="endTime">End time:</TypeLabel>
            <Select
              data-testid="endTime"
              label="endTime"
              instanceId="endTime"
              isSearchable={false}
              styles={reactSelectStyles}
              options={endTimeOptions.map(o => ({ ...o, isDisabled: startTime > o.value }))}
              value={endTimeOptions[endTime]}
              onChange={selection => {
                settingsEndTimeChangeThunk({
                  startDate: getTime(startDate),
                  endDate: getTime(endDate),
                  startTime,
                  endTime: selection.value
                })
              }}
            />
          </Control>
        </Row>
      )}
    </Form>
  )
}

function mapStateToProps(state: ReduxState) {
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
