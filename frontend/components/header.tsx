import React, { FunctionComponent } from 'react'
import Select from 'react-select'
import styled from 'styled-components'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import { ReduxState } from '../redux'
import { Reading } from '../redux/api'

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
  margin: 1rem 0;
`
const Col = styled.li`
  color: #f0f0f0;
  display: inline-block;
  margin: 0 1rem 0 0;
`

const Nav = styled.ul``

const selectStyles = {
  container: (provided, state) => ({
    ...provided,
    width: '8rem'
  }),
  control: (provided, state) => ({
    ...provided,
    backgroundColor: '#171717',
    borderColor: '#233130',
    borderRadius: 0,
    boxShadow: 'none',
    minHeight: 0,
    fontSize: '0.8rem',
    height: 33,
    width: 146,
    cursor: 'pointer',
    '&:hover': {
      borderColor: '#476c6c'
    },
    '>div': {
      padding: '0 0.5rem'
    }
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: '#f0f0f0',
    fontSize: '0.8rem'
  }),
  indicatorsContainer: () => ({
    display: 'none'
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: '#f0f0f0'
  }),
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: '#212e2e',
    borderRadius: '0.3rem',
    width: 146,
    margin: '10px 0'
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor:  state.isSelected ? '#476c6c' : null,
    color: state.isSelected ? '#f0f0f0' : null,
    '&:hover': {
      backgroundColor: '#476c6c',
      color: '#f0f0f0',
      cursor: 'pointer'
    }
  })
}

type Props = {
  ready: boolean
  readings: Reading[]
}

const handleChange = () => {
  console.log('jhfdsjkhjks')
}

const graphs = [
  { value: 'linear', label: 'Linear graph' },
  { value: 'overlayDays', label: 'Overlay days' },
  { value: 'overlayWeeks', label: 'Overlay weeks' },
  { value: 'meanAverage', label: 'Mean average' }
]

const Header: FunctionComponent<Props> = ({ ready, readings }) => {
  return (
    <Container>
      <H1>Levels</H1>
      <H2>Latest CGM reading: {ready ? new Date(readings[readings.length - 1].date).toUTCString() : 'Loading'}</H2>

      <Nav>
        {ready &&
        <>
          <Col>
            <DatePicker
              showPopperArrow={false}
              selected={readings[readings.length - 1].date}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <DatePicker
              showPopperArrow={false}
              selected={readings[0].date}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Select styles={selectStyles} options={graphs} />
          </Col>
        </>
        }
      </Nav>

    </Container>
  )
}


function mapStateToProps(state: ReduxState) {
  return {
    ready: state.readings?.data?.length > 0 && !state.readings.pending,
    readings: state.readings?.data
  }
}

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

