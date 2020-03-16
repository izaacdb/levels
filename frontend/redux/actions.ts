import { ActionType, GraphType } from './index'

export const readingsGetSuccess = (data: any[]) => {
  return { type: ActionType.READINGS_GET_SUCCESS, data }
}

export const readingsGetPending = () => {
  return { type: ActionType.READINGS_GET_PENDING }
}
export const readingsGetFailed = (error: string) => {
  return { type: ActionType.READINGS_GET_FAILED, error }
}

export const settingsStartDateChange = (data: Date) => {
  return { type: ActionType.SETTINGS_START_DATE_CHANGE, data }
}

export const settingsEndDateChange = (data: Date) => {
  return { type: ActionType.SETTINGS_END_DATE_CHANGE, data }
}

export const settingsStartTimeChange = (data: Number) => {
  return { type: ActionType.SETTINGS_START_TIME_CHANGE, data }
}

export const settingsEndTimeChange = (data: Number) => {
  return { type: ActionType.SETTINGS_END_TIME_CHANGE, data }
}
export const settingsGraphChange = (data: GraphType) => {
  return { type: ActionType.SETTINGS_GRAPH_CHANGE, data }
}
