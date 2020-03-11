import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import styled from 'styled-components'
import withReduxStore from '../redux/store'
import { BaseStyles } from '../components/styles'
import Nav from '../components/nav'
import Footer from '../components/footer'

const Stripes = styled.div`
  position: absolute;
  z-index: -1;
  display: grid;
  width: 100vw;
  top: 0;
  transform: skewY(-12deg);
  transform-origin: 0;
  background: linear-gradient(#171717 0,#192323 100%);
  grid: repeat(5, 200px) / repeat(10, 1fr);
  span:nth-child(1){
    grid-column: span 8;
    background: linear-gradient(100grad,#171717 30%,#243737);
  }
  span:nth-child(2){
    grid-area: 3 / span 4 / auto / -1;
    background: linear-gradient(100grad,#181d1d 10%,#192323);
  }
  span:nth-child(3) {
    grid-row: 4;
    grid-column: span 5;
    background: linear-gradient(100grad,#171717,#192323 150%);
  }
`

const Container = styled.div`
  max-width:1024px;
  margin: 0 auto;
`

export class Mobile extends App<any> {
  private persistor

  constructor(props) {
    super(props)
    this.persistor = persistStore(props.reduxStore)
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props

    return (
      <>
        <Head>
          <title>Healthbar</title>
          <link rel="shortcut icon" href="favicon.ico" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=no" />
        </Head>
        <BaseStyles />
        <Provider store={reduxStore}>
          <PersistGate loading={<Component {...pageProps} />} persistor={this.persistor}>
            <Stripes>
              <span />
              <span />
              <span />
            </Stripes>
            <Container>
              <Nav />
              <Component {...pageProps} style={{ position: 'fixed' }} />
              <Footer />
            </Container>

          </PersistGate>
        </Provider>
      </>
    )
  }
}

export default withReduxStore(Mobile)
