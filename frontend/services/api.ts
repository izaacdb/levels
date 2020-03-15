import axios from 'axios'

export type Reading = {
  sgv: number
  date: number
  noise: number
  rssi: number
}

const env = process.env.NODE_ENV || 'development'

const getMongoURL = (startDate: number, endDate: number) => {
  switch (env) {
    case 'production':
      return `https://levels-lambdas.netlify.com/.netlify/functions/mongo?startDate=${startDate}&endDate=${endDate}`
    case 'development':
    case 'test':
    default:
      return `http://192.168.1.71:9000/mongo?startDate=${startDate}&endDate=${endDate}`
  }
}

export const readingsGet = (startDate: number, endDate: number): Promise<Reading[]> => {
  return axios
    .get(getMongoURL(startDate, endDate))
    .then(response => {
      return response.data.map(r => ({ ...r, sgv: r.sgv * 0.0555 }))
    })
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
