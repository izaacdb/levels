import React from 'react'
import { render } from '@testing-library/react'
import Background from '../components/background'

describe('<Background />', () => {

  test('snapshot test', () => {
    const tree = render(<Background />)
    expect(tree).toMatchSnapshot()
  })

})
