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

export const settingsStartChange = (data: number) => {
  return { type: ActionType.SETTINGS_START_CHANGE, data }
}

export const settingsEndChange = (data: number) => {
  return { type: ActionType.SETTINGS_END_CHANGE, data }
}
export const settingsGraphChange = (data: GraphType) => {
  return { type: ActionType.SETTINGS_GRAPH_CHANGE, data }
}
