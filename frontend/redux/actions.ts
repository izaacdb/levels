import { ActionTypes } from './index'
import { readingsGet } from './api'

export const readingsGetSuccess = (data: any[]) => {
  return { type: ActionTypes.READINGS_GET_SUCCESS, data }
}

export const readingsGetPending = () => {
  return { type: ActionTypes.READINGS_GET_PENDING }
}
export const readingsGetFailed = (error: string) => {
  return { type: ActionTypes.READINGS_GET_FAILED, error }
}

// thunks

export function getReadingsThunk() {
  return dispatch => {
    dispatch(readingsGetPending())
    readingsGet().then(readings => {
      setTimeout(() => {
        if (readings.length > 0) {
          dispatch(readingsGetSuccess(readings))
        } else {
          dispatch(readingsGetFailed('No results from API'))
        }
      }, 10000)
    })
  }
}
