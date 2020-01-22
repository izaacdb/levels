import axios from 'axios'

const readings = 'https://healthbar-lambdas.netlify.com/.netlify/functions/mongo'

export type Reading = {
  sgv: number
  date: number
  noise: number
  rssi: number
}

export const readingsGet = (): Promise<Reading[]> => {
  return axios.get(readings)
    .then(response => response.data)
    .catch(e => {
      handleError(e)
      return []
    })
}

const handleError = error => {
  if (error.response) {
    console.log('Response error')
    console.log(error.response.data)
    console.log(error.message)
  } else if (error.request) {
    console.log('Request error')
    console.log(error.request)
  } else if (error.config) {
    console.log('Config error')
    console.log(error.config)
  } else {
    console.log('Setup error')
    console.log(error.stack)
    console.log(error.message)
  }
}
