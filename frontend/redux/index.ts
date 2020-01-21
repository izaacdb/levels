import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

export enum ActionTypes {
  READINGS_GET_SUCCESS = '[Readings] DB retrieval succeeded',
  READINGS_GET_PENDING = '[Readings] DB retrieval pending',
  READINGS_GET_FAILED = '[Readings] DB retrieval failed',
}

export interface ReduxState {
  readings: any[]
  getState: () => void
}

export const readingsReducer = (state = [], action) => {
  switch (action.type) {

    case ActionTypes.READINGS_GET_SUCCESS: {
      console.log(action)
      return { ...state, data: action.data }
    }
    case ActionTypes.READINGS_GET_PENDING: {
      console.log(action)
      return {
        ...state,
        pending: true
      }
    }
    case ActionTypes.READINGS_GET_FAILED: {
      console.log(action)
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

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['readings']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export function initializeStore(initialState) {
  return createStore(persistedReducer, initialState, composeWithDevTools(applyMiddleware(...middleWares)))
}
