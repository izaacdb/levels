import { ActionTypes } from './index'

export const readingsGetSuccess = (data: any[]) => {
  return { type: ActionTypes.READINGS_GET_SUCCESS, data }
}

export const readingsGetPending = () => {
  return { type: ActionTypes.READINGS_GET_PENDING }
}
export const readingsGetFailed = (error: string) => {
  return { type: ActionTypes.READINGS_GET_FAILED, error }
}
