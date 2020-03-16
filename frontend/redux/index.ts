import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { getTime, subDays } from 'date-fns'

import thunk from 'redux-thunk'
import { Reading } from '../services/api'

export enum ActionType {
  READINGS_GET_SUCCESS = '[Readings] DB retrieval succeeded',
  READINGS_GET_PENDING = '[Readings] DB retrieval pending',
  READINGS_GET_FAILED = '[Readings] DB retrieval failed',
  SETTINGS_START_DATE_CHANGE = '[Settings] Start date changed',
  SETTINGS_END_DATE_CHANGE = '[Settings] End date changed',
  SETTINGS_START_TIME_CHANGE = '[Settings] Start time changed',
  SETTINGS_END_TIME_CHANGE = '[Settings] End time changed',
  SETTINGS_GRAPH_CHANGE = '[Settings] Graph type changed'
}

export enum GraphValues {
  linear = 'linear',
  aggregate = 'aggregate'
}

export interface GraphType {
  value: string
  label: string
}

export const graphTypes: GraphType[] = [
  { value: GraphValues.linear, label: 'Linear graph' },
  { value: GraphValues.aggregate, label: 'Aggregate days' }
]

export interface ReduxState {
  readings: { data: Reading[]; pending: boolean; error: string }
  getState: () => void
  settings: { startDate: number; endDate: number; startTime: number; endTime: number; graphType: GraphType }
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

const initialSettingsState: ReduxState['settings'] = {
  startDate: getTime(subDays(new Date(), 3)),
  endDate: getTime(new Date()),
  startTime: 0,
  endTime: 23,
  graphType: graphTypes[0]
}

export const readingsReducer = (state: ReduxState['readings'] = initialReadingState, action: Action<Reading[]>) => {
  switch (action.type) {
    case ActionType.READINGS_GET_SUCCESS: {
      return { ...state, data: action.data, pending: false }
    }
    case ActionType.READINGS_GET_PENDING: {
      return {
        ...state,
        pending: true
      }
    }
    case ActionType.READINGS_GET_FAILED: {
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

export const settingsReducer = (
  state: ReduxState['settings'] = initialSettingsState,
  action: Action<number | GraphType>
) => {
  switch (action.type) {
    case ActionType.SETTINGS_START_DATE_CHANGE: {
      return { ...state, startDate: action.data }
    }
    case ActionType.SETTINGS_END_DATE_CHANGE: {
      return { ...state, endDate: action.data }
    }
    case ActionType.SETTINGS_START_TIME_CHANGE: {
      return { ...state, startTime: action.data }
    }
    case ActionType.SETTINGS_END_TIME_CHANGE: {
      return { ...state, endTime: action.data }
    }
    case ActionType.SETTINGS_GRAPH_CHANGE: {
      return { ...state, graphType: action.data }
    }
    default: {
      return state
    }
  }
}

const rootReducer = combineReducers({
  readings: readingsReducer,
  settings: settingsReducer
})

const middleWares = [thunk]

export function initializeStore(initialState) {
  return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleWares)))
}
