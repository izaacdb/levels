import React from 'react'
import { fireEvent, getByText, render, waitFor, waitForElement } from '@testing-library/react'
import { dateFormat, Header, Props } from '../components/header'
import { GraphValues } from '../redux'
import { format, subDays } from 'date-fns'

const readings = [
  {
    date: 1579621683063,
    dateString: '2020-01-21T15:48:03.063+0000',
    sgv: 9,
    rssi: 100,
    noise: 1
  },
  {
    date: 1579621683064,
    dateString: '2020-01-21T15:48:03.064+0000',
    sgv: 9.1,
    rssi: 100,
    noise: 1
  }
]

function renderHeader(props: Partial<Props> = {}) {
  const defaultProps: Props = {
    settingsStartChangeThunk() {
      return () => null
    },
    settingsEndChangeThunk() {
      return () => null
    },
    settingsStartTimeChangeThunk() {
      return () => null
    },
    settingsEndTimeChangeThunk() {
      return () => null
    },
    settingsGraphChangeThunk() {
      return () => null
    },
    ready: true,
    readings,
    startDate: subDays(new Date(), 1),
    endDate: new Date(),
    startTime: 0,
    endTime: 23,
    graphType: { value: GraphValues.linear, label: 'Linear graph' }
  }
  return render(<Header {...defaultProps} {...props} />)
}

const keyDownEvent = {
  key: 'ArrowDown'
}

describe('<Header />', () => {
  test('snapshot test', () => {
    const tree = renderHeader()
    expect(tree).toMatchSnapshot()
  })

  test('should render a form with several fields', async () => {
    const { findByTestId } = renderHeader()
    const header = await findByTestId('headerForm')
    expect(header).toBeInTheDocument()
  })

  test('startDate should get show a formatted date from the props', () => {
    const { getByTestId } = renderHeader()
    const startDateDomElement = getByTestId('startDate')
    expect(startDateDomElement).toHaveValue(format(subDays(new Date(), 1), dateFormat))
  })

  test('react-select should have options, and start on linear', async () => {
    const { getByTestId } = renderHeader()
    const container = getByTestId('graphType')
    const input = container.querySelector('input[name="graphType')
    expect(input).toHaveValue('linear')
  })
})
