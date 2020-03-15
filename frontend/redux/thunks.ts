import { readingsGet } from '../services/api'
import {
  readingsGetFailed,
  readingsGetPending,
  readingsGetSuccess,
  settingsEndChange,
  settingsStartChange
} from './actions'

export function getReadingsThunk(startDate: number, endDate: number) {
  return dispatch => {
    dispatch(readingsGetPending())
    readingsGet(startDate, endDate).then(readings => {
      if (readings.length > 0) {
        dispatch(readingsGetSuccess(readings))
      } else {
        dispatch(readingsGetFailed('No results from API'))
      }
    })
  }
}

export function settingsEndChangeThunk(startDate: number, endDate: number) {
  return dispatch => {
    dispatch(settingsEndChange(endDate))
    dispatch(getReadingsThunk(startDate, endDate))
  }
}

export function settingsStartChangeThunk(startDate: number, endDate: number) {
  return dispatch => {
    dispatch(settingsStartChange(startDate))
    dispatch(getReadingsThunk(startDate, endDate))
  }
}
