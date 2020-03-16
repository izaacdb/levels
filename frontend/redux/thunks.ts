import { readingsGet } from '../services/api'
import {
  readingsGetFailed,
  readingsGetPending,
  readingsGetSuccess,
  settingsEndDateChange, settingsEndTimeChange,
  settingsStartDateChange, settingsStartTimeChange
} from './actions'

export interface Options{
  startDate: Date
  endDate: Date
  startTime?: number
  endTime?: number
}

export function getReadingsThunk(options: Options) {
  return dispatch => {
    dispatch(readingsGetPending())
    readingsGet(options).then(readings => {
      if (readings.length > 0) {
        dispatch(readingsGetSuccess(readings))
      } else {
        dispatch(readingsGetFailed('No results from API'))
      }
    })
  }
}

export function settingsStartDateChangeThunk(options: Options) {
  return dispatch => {
    dispatch(settingsStartDateChange(options.startDate))
    dispatch(getReadingsThunk(options))
  }
}

export function settingsEndDateChangeThunk(options: Options) {
  return dispatch => {
    dispatch(settingsEndDateChange(options.endDate))
    dispatch(getReadingsThunk(options))
  }
}

export function settingsStartTimeChangeThunk(options: Options) {
  return dispatch => {
    dispatch(settingsStartTimeChange(options.startTime))
    dispatch(getReadingsThunk(options))
  }
}

export function settingsEndTimeChangeThunk(options: Options) {
  return dispatch => {
    dispatch(settingsEndTimeChange(options.endTime))
    dispatch(getReadingsThunk(options))
  }
}
