import React, { FunctionComponent, useEffect, createRef } from 'react'
import * as d3 from 'd3'
import styled from 'styled-components'
import { Reading } from '../redux/api'

const Svg = styled.svg`
  background-color: #171717;
  //margin: 0 30px;
  border: 1px solid #223130;
`

type d3Node = {
  id: string,
  group: number
};

type d3Link = {
  source: string,
  target: string,
  value: number
};

type Graph = {
  nodes: d3Node[],
  links: d3Link[]
};

type Props = {
  data: Reading[]
  height: number
  width: number
  margin: number
}

const Graph: FunctionComponent<Props> = ({ data, height, width, margin }) => {
  const svgRef = createRef<SVGSVGElement>()

  useEffect(() => {

    const chart = d3.select(svgRef.current)

    const timeFormat = d3.timeFormat('%H:%M')

    chart.attr('width', width).attr('height', height)
    chart.append('rect')
      .attr('x', margin)
      .attr('y', height - (height * 0.22) - margin)
      .attr('width', width - margin - margin)
      .attr('height', height * 0.22)
      .attr('fill', '#400d02')
      .attr('opacity', 1)

    chart.append('line')
      .attr('x1', margin)
      .attr('y1', height - (height * 0.22) - margin)
      .attr('x2', width - margin)
      .attr('y2', height - (height * 0.22) - margin)
      .attr('stroke', '#ca0000')
      .attr('stroke-width', 0.5)

    chart.append('line')
      .attr('x1', margin)
      .attr('y1', height - (height * 0.45) - margin)
      .attr('x2', width - margin)
      .attr('y2', height - (height * 0.45) - margin)
      .attr('stroke-width', 0.5)
      .attr('stroke', '#ffc107')

    const xMin = d3.min(data, (d) => Math.min(d.date))
    const xMax = d3.max(data, (d) => Math.max(d.date))

    // const yMin = d3.min(data, (d) => Math.min(d.sgv))
    // const yMax = d3.max(data, (d) => Math.max(d.sgv))

    const xScale = d3.scaleTime()
      .domain([xMin, xMax])
      .range([margin, width - margin])

    const yScale = d3.scaleLinear()
      .domain([0, 20])
      .range([height - margin, margin])

    const yAxis = d3.axisLeft(yScale)
      .ticks(5)
    // .tickValues(yScale.domain())

    const xAxis = d3.axisBottom(xScale)
      .ticks(5)
      .tickPadding(5)
      .tickFormat(timeFormat)


    chart.selectAll('dot')
      .data(data)
      .enter()
      .append('svg:circle')
      .attr('r', 1)
      .attr('cx', d => xScale(d.date))
      .attr('cy', d => yScale(d.sgv))

      .style('stroke', d => {
        if (d.sgv > 9) {
          return '#ffc107'
        } else if (d.sgv < 4.3) {
          return '#ff5722'
        }
        return '#00bcd4'
      })


    chart.append('g').call(yAxis)
      .attr('transform', `translate(${margin}, 0)`).attr('stroke', '#CCCCCC')

    chart.append('g').call(xAxis)
      .attr('transform', 'translate(0, ' + (height - margin) + ')').attr('stroke', '#CCCCCC')


    //
    // chart.append('rect')
    //   .attr('x', margin)
    //   .attr('y', height - (height * 0.45) - margin)
    //   .attr('width', width - margin - margin)
    //   .attr('height', height * 0.22)
    //   .attr('fill', 'green')
    //   .attr('opacity', 0.2)

  }, [svgRef])

  return (
    <Svg style={width + margin + margin} ref={svgRef} />
  )
}

export default Graph


/**
 const xMax = d3.max(data, d => +d.date)
 const yMax = d3.max(data, d => +d.sgv)
 const padding = 30
 const width = 500
 const height = 300
 const xScale = d3.scaleLinear()
 .domain([0, xMax])
 .range([padding, width - padding * 2])
 const yScale = d3.scaleLinear()
 .domain([0, yMax])
 .range([height - padding, padding])
 const scales = { xScale, yScale }
 return (
 <svg width={width} height={height}>
 <Dots {...scales} />
 </svg>
 )
 **/
