import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import styled from 'styled-components'
import withReduxStore from '../redux/store'
import { BaseStyles } from '../components/styles'
import Header from '../components/header'
import Footer from '../components/footer'
import Background from '../components/background'

const Container = styled.div`
  padding: 1rem;
  max-width:1024px;
  margin: 0 auto;
  box-sizing: content-box;
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
          <title>Levels</title>
          <link rel="shortcut icon" href="favicon.ico" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=no" />
        </Head>
        <BaseStyles />
        <Provider store={reduxStore}>
          <PersistGate loading={<Component {...pageProps} />} persistor={this.persistor}>
            <Background />
            <Container>
              <Header />
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
