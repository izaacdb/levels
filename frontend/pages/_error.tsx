import React from 'react'
import styled from 'styled-components'

const ErrorDiv = styled.div`
  display: flex;
  
  justify-content: center;
  align-items: flex-start;
  font-family: HMSerifRegular, sans-serif;
  flex-direction: column;
  padding: 0 10vw 3vw;
`

interface Props {
  statusCode?: number
  product?: string
}

export default class Error extends React.Component<Props> {
  static getInitialProps({ res, xhr, err }) {
    const statusCode = res ? res.statusCode : xhr ? xhr.status : null
    return { statusCode, err }
  }

  render() {
    return (
      <ErrorDiv>
        {this.props.statusCode
          ? `A ${this.props.statusCode} error occurred.`
          : `An unspecified error occurred.`}
      </ErrorDiv>
    )
  }
}
