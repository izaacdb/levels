import React, { FunctionComponent, useEffect, createRef } from 'react'
import * as d3 from 'd3'
import styled from 'styled-components'
import { connect } from 'react-redux'
import moment from 'moment'
import { Reading } from '../services/api'
import { blackBg, graphBorder, high, low, lowBorder, lowDot, normalDot, white } from './styles'
import { ReduxState } from '../redux'

type Props = {
  data: Reading[]
  height: number
  width: number
  margin: number
  startDate: number
  endDate: number
}

const Container = styled.div`
  width: 100%;
  overflow: scroll;
  background-color: ${blackBg};
  border: 1px solid ${graphBorder};
`

// const roundMinutes = (date: number) => {
//   const actualDate = new Date(date)
//   actualDate.setHours(actualDate.getHours() + Math.round(actualDate.getMinutes() / 60))
//   actualDate.setMinutes(0)
//   return actualDate.getTime()
// }

const DayGraph: FunctionComponent<Props> = ({ data, height, width, margin, startDate, endDate }) => {
  const svgRef = createRef<SVGSVGElement>()

  useEffect(() => {
    //1584311645865
    const midnight = moment().set({year: 2000, month: 0, date:0, hour:0, minute: 0, second:0, millisecond:0}).toDate()
    const nextMidnight = moment().set({year: 2000, month: 0, date:0, hour:23, minute: 59, second:59, millisecond:999}).toDate()
    const newData = data.map(d => {
      return {...d, date: moment(d.date).set({ year: 2000, month: 0, date: 0 }).toDate()}
    })
    console.log(newData)
    svgRef.current.innerHTML = ''

    const transition = d3
      .transition()
      .duration(300)
      .ease(d3.easeLinear)

    const chart = d3.select(svgRef.current)

    const timeFormat = d3.timeFormat('%H:%M')

    chart.attr('width', width).attr('height', height)

    // 265 x axis line
    const yPosOfXAxis = 265
    const plotWidth = width - margin * 2
    const plotHeight = height - margin * 2

    chart
      .append('rect')
      .attr('x', margin)
      .attr('y', yPosOfXAxis) // 360 - 30
      .attr('width', plotWidth)
      .attr('height', plotHeight * 0.22)
      .attr('fill', lowBorder)
      .attr('opacity', 1)

    chart
      .append('line')
      .attr('x1', margin)
      .attr('y1', yPosOfXAxis)
      .attr('x2', plotWidth + margin)
      .attr('y2', yPosOfXAxis)
      .attr('stroke', low)
      .attr('stroke-width', 0.5)

    chart
      .append('line')
      .attr('x1', margin)
      .attr('y1', margin * 2 + plotHeight * 0.45) // 30 + 135
      .attr('x2', plotWidth + margin)
      .attr('y2', margin * 2 + plotHeight * 0.45)
      .attr('stroke', high)
      .attr('stroke-width', 0.5)

    const xScale = d3
      .scaleTime()
      .domain([midnight, nextMidnight])
      .nice(d3.timeDay)
      .range([margin, width - margin])

    const yScale = d3
      .scaleLinear()
      .domain([0, 20])
      .range([height - margin, margin])

    const yAxis = d3.axisLeft(yScale).ticks(5)
    // .tickValues(yScale.domain())

    const xAxis = d3
      .axisBottom(xScale)
      .ticks(10)
      .tickSizeOuter(0)
      .tickPadding(5)
      .tickFormat(timeFormat)

    chart
      .selectAll('dot')
      .data(newData)
      .enter()
      .append('svg:circle')
      .attr('stroke-opacity', 0)
      .attr('r', 1)
      .attr('cx', d => xScale(0))
      .attr('cy', d => yScale(0))
      .transition(transition)
      .delay((d, i) => i * (1200 / data.length))
      .attr('cx', d => xScale(d.date))
      .attr('cy', d => yScale(d.sgv))

      .style('fill', d => {
        if (d.sgv > 9) {
          return high
        } else if (d.sgv < 4.3) {
          return lowDot
        }
        return normalDot
      })

    chart
      .append('g')
      .call(yAxis)
      .attr('transform', `translate(${margin}, 0)`)
      .attr('stroke', white)
      .attr('font-weight', 300)

    chart
      .append('g')
      .call(xAxis)
      .attr('transform', 'translate(0, ' + (height - margin) + ')')
      .attr('stroke', white)
      .attr('font-weight', 300)
  }, [svgRef])

  return (
    <Container>
      <svg ref={svgRef} />
    </Container>
  )
}

function mapStateToProps(state: ReduxState) {
  return {
    startDate: state.settings.startDate,
    endDate: state.settings.endDate
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(DayGraph)
