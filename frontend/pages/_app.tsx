import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import withReduxStore from '../redux/store'
import { BaseStyles } from '../components/styles'
import Nav from '../components/nav'
import Footer from '../components/footer'

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
          <meta name="viewport" content="initial-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=no" />
          <style>
            @import url('https://fonts.googleapis.com/css?family=IBM+Plex+Sans&display=swap');
          </style>
        </Head>
        <BaseStyles />
        <Provider store={reduxStore}>
          <PersistGate loading={<Component {...pageProps} />} persistor={this.persistor}>
            <Nav />
            <Component {...pageProps} style={{ position: 'fixed' }} />
            <Footer />
          </PersistGate>
        </Provider>
      </>
    )
  }
}

export default withReduxStore(Mobile)
