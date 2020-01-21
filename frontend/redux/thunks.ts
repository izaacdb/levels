import { readingsGet } from './api'
import { readingsGetFailed, readingsGetPending, readingsGetSuccess } from './actions'

export function getReadingsThunk() {
  console.log('readings think')
  return dispatch => {
    dispatch(readingsGetPending())
    readingsGet()
      .then(readings => {
        console.log('got readings?', readings)
        if (!readings) {
          console.log('error handler')
        }
        dispatch(readingsGetSuccess(readings))
      })
      .catch(error => {
        console.log('got error?', error)
        dispatch(readingsGetFailed(error))
      })
  }
}
