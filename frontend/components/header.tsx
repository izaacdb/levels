import React, { FunctionComponent } from 'react'
import Select from 'react-select'
import styled from 'styled-components'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import { ReduxState } from '../redux'
import { Reading } from '../services/api'
import { blackBg, cyan, selectBg, selectBorder, teal, white } from './styles'

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

const Nav = styled.ul``

const selectStyles = {
  container: (provided, state) => ({
    ...provided,
    width: '8rem'
  }),
  control: (provided, state) => ({
    ...provided,
    backgroundColor: blackBg,
    borderColor: state.menuIsOpen ? cyan : selectBorder,
    borderRadius: 0,
    boxShadow: 'none',
    minHeight: 0,
    fontSize: '0.8rem',
    height: 33,
    width: 146,
    cursor: 'pointer',
    '&:hover': {
      borderColor: cyan
    },
    '>div': {
      padding: '0 0.5rem',
      height: '100%'
    }
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: white,
    fontSize: '0.8rem'
  }),
  indicatorsContainer: () => ({
    display: 'none'
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: white,
    margin: 0
  }),
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: selectBg,
    border: `1px solid ${teal}`,
    borderRadius: '0',
    width: 146,
    margin: '10px 0'
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? cyan : null,
    color: state.isSelected ? white : null,
    '&:hover': {
      backgroundColor: cyan,
      color: white,
      cursor: 'pointer'
    }
  }),
  menuList: (provided, state) => ({
    ...provided,
    padding: 0
  })
}

type Props = {
  ready: boolean
  readings: Reading[]
}

const handleChange = () => {
  console.log('jhfdsjkhjks')
}

const handleDateChangeRaw = e => {
  e.preventDefault()
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
      <H2> {ready ? `Latest CGM reading: ${new Date(readings[readings.length - 1].date).toUTCString()}` : 'Loading data, please wait'}</H2>

      <Nav>
        {ready && (
          <>
            <Col>
              <label className="header-label">Start date:</label>
              <DatePicker
                showPopperArrow={false}
                selected={readings[readings.length - 1].date}
                onChange={handleChange}
                onChangeRaw={handleDateChangeRaw}
              />
            </Col>
            <Col>
              <label className="header-label">End date:</label>
              <DatePicker
                showPopperArrow={false}
                selected={readings[0].date}
                onChange={handleChange}
                onChangeRaw={handleDateChangeRaw}
              />
            </Col>
            <Col>
              <label className="header-label graph-type-label">Graph type:</label>
              <Select isSearchable={false} styles={selectStyles} options={graphs} />
            </Col>
          </>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Header)
