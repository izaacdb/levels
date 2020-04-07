import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'
import styled from 'styled-components'
import 'react-datepicker/dist/react-datepicker.css'
import withReduxStore from '../redux/store'
import { BaseStyles } from '../components/styles'
import Header from '../components/header'
import Footer from '../components/footer'
import Background from '../components/background'

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
`

const Container = styled.div`
  padding: 1rem;
  max-width: 1024px;
  margin: 0 auto;
  box-sizing: content-box;
`

export class Mobile extends App<any> {
  constructor(props) {
    super(props)
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props

    return (
      <>
        <Head>
          <title>Levels</title>

          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=no" />
          <meta name="description" content="Description" />
          <meta name="keywords" content="Keywords" />

          <link rel="shortcut icon" href="icons/icon-32x32.ico" />
          <link rel="manifest" href="/manifest.json" />
          <link href='/icons/icon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
          <link href='/icons/icon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
          <link rel="apple-touch-icon" href="/icons/apple-icon.png" />
          <meta name="theme-color" content="#466b6c"/>
        </Head>
        <BaseStyles />
        <Provider store={reduxStore}>
          <Background />
          <Wrapper>
            <Container>
              <Header />
              <Component {...pageProps} />
              <Footer />
            </Container>
          </Wrapper>
        </Provider>
      </>
    )
  }
}

export default withReduxStore(Mobile)
