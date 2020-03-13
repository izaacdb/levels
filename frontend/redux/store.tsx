import React from 'react'
import { initializeStore, ReduxState } from './index'

const isServer = typeof window === 'undefined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

function getOrCreateStore(initialState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(initialState)
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState)
  }
  return window[__NEXT_REDUX_STORE__]
}

async function getInitialState() {
  return {}
}

export default App => {
  return class AppWithRedux extends React.Component {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private reduxStore: any

    static async getInitialProps(appContext) {
      let initialState = {}
      if (isServer || !window[__NEXT_REDUX_STORE__]) {
        initialState = await getInitialState()
      }

      const reduxStore: ReduxState = getOrCreateStore(initialState)
      appContext.ctx.reduxStore = reduxStore
      let appProps = {}
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(appContext)
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState()
      }
    }

    constructor(props) {
      super(props)
      // eslint-disable-next-line react/prop-types
      this.reduxStore = getOrCreateStore(props.initialReduxState)
    }

    render() {
      return <App {...this.props} reduxStore={this.reduxStore} />
    }
  }
}
