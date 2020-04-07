import React, { FunctionComponent, useEffect, createRef } from 'react'
import * as d3 from 'd3'
import styled from 'styled-components'
import { Reading } from '../../services/api'
import { blackBg, graphBorder, high, low, lowBorder, lowDot, normalDot, white } from '../styles'
import { Options } from '../../redux/thunks'
import { differenceInDays } from 'date-fns'

type Props = {
  data: Reading[]
  height: number
  width: number
  margin: number
  options: Options
}

const Container = styled.div`
  width: 100%;
  overflow: scroll;
  background-color: ${blackBg};
  border: 1px solid ${graphBorder};
`

const Graph: FunctionComponent<Props> = ({ data, height, width, margin, options }) => {
  const svgRef = createRef<SVGSVGElement>()

  useEffect(() => {
    console.log(`Graph effect: ${data.length} data points`)
    svgRef.current.innerHTML = ''

    const transition = d3
      .transition()
      .duration(300)
      .ease(d3.easeLinear)

    const chart = d3.select(svgRef.current)
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

    // actual graph data vvv

    const xMin = d3.min(data, () => options.startDate -1)
    const xMax = d3.max(data, () => options.endDate + 1)

    const xScale = d3
      .scaleTime()
      .domain([xMin, xMax])
      .nice(d3.timeDay)
      .range([margin, width - margin])

    const yScale = d3
      .scaleLinear()
      .domain([0, 20])
      .range([height - margin, margin])

    chart
      .selectAll('dot')
      .data(data)
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

    const clockFormat = d3.timeFormat('%H:%M')
    const dateFormat = d3.timeFormat('%e %B')

    const sgvAxis = d3.axisLeft(yScale).ticks(5)

    const clockAxis = d3
      .axisBottom(xScale)
      .tickSizeOuter(0)
      .tickPadding(5)
      .tickFormat(clockFormat)

    const dateAxis = d3
      .axisTop(xScale)
      .ticks(+differenceInDays(options.endDate, options.startDate))
      .tickSizeOuter(0)
      .tickPadding(5)
      .tickFormat(dateFormat)

    chart
      .append('g')
      .call(sgvAxis)
      .attr('transform', `translate(${margin}, 0)`)
      .attr('stroke', white)
      .attr('font-weight', 300)

    chart
      .append('g')
      .call(clockAxis)
      .attr('transform', 'translate(0, ' + (height - margin) + ')')
      .attr('stroke', white)
      .attr('font-weight', 300)

    chart
      .append('g')
      .call(dateAxis)
      .attr('transform', 'translate(0, ' + (height - margin) + ')')
      .attr('stroke', white)
      .attr('font-weight', 300)

    // const xAxisLabels = d3.selectAll('g.x.axis g text').each(insertBreaks)
  }, [svgRef])

  return (
    <Container>
      <svg ref={svgRef} />
    </Container>
  )
}

export default Graph
