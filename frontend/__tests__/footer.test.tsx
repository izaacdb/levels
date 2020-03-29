import React from 'react'
import { render } from '@testing-library/react'
import { Footer, Props } from '../components/footer'
import { testReadings } from './header.test'

function renderFooter(props: Partial<Props> = {}) {
  const defaultProps: Props = {
    readings: testReadings,
    ready: true
  }
  return render(<Footer {...defaultProps} {...props} />)
}

const numberRegEx = /^\d+(\.\d{1,2})?$/ // only 244 | 10.89 | 9.5 etc

describe('<Footer />', () => {
  // test('snapshot test', () => {
  //   const tree = renderFooter()
  //   expect(tree).toMatchSnapshot()
  // })

  test('mean should show a numeric value', () => {
    const { getByTestId } = renderFooter()
    const mean = getByTestId('mean')
    expect(mean).toBeInTheDocument()
    const value = mean.innerHTML
    expect(value).toMatch(numberRegEx)
  })
})
