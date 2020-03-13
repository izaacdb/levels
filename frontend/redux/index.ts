import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import thunk from 'redux-thunk'
import { Reading } from '../services/api'

export enum ActionTypes {
  READINGS_GET_SUCCESS = '[Readings] DB retrieval succeeded',
  READINGS_GET_PENDING = '[Readings] DB retrieval pending',
  READINGS_GET_FAILED = '[Readings] DB retrieval failed'
}

export interface ReduxState {
  readings: { data: Reading[]; pending: boolean; error: string }
  getState: () => void
}

interface Action<T> {
  data: T
  error?: string
  type: string
}

const initialReadingState: ReduxState['readings'] = {
  data: [],
  pending: false,
  error: null
}

export const readingsReducer = (state: ReduxState['readings'] = initialReadingState, action: Action<Reading[]>) => {
  switch (action.type) {
    case ActionTypes.READINGS_GET_SUCCESS: {
      return { ...state, data: action.data, pending: false }
    }
    case ActionTypes.READINGS_GET_PENDING: {
      return {
        ...state,
        pending: true
      }
    }
    case ActionTypes.READINGS_GET_FAILED: {
      return {
        ...state,
        pending: false,
        error: action.error
      }
    }
    default: {
      return state
    }
  }
}

const rootReducer = combineReducers({
  readings: readingsReducer
})

const middleWares = [thunk]

export function initializeStore(initialState) {
  return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleWares)))
}
