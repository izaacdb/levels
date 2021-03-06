import dotenv from 'dotenv'
import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda'
import * as mongoose from 'mongoose'
import { wrap } from './lib'

/**
 * Database starts at
 * new Date(1579621683063)
 * Tue Jan 21 2020 15:48:03 GMT+0000 (Western European Standard Time)
 */

dotenv.config()
const { DBUSER, DBPASSWORD, DBURL, DBPORT, DBNAME } = process.env
const uri = `mongodb://${DBUSER}:${DBPASSWORD}@${DBURL}:${DBPORT}/${DBNAME}`

mongoose
  .connect(uri)
  .then(() => {
    console.log('Successfully Connected!')
  })
  .catch(e => {
    console.log(e.message)
  })

export interface IReading extends mongoose.Document {
  _id: {
    $oid: string
  }
  device: string
  date: number
  dateString: string
  sgv: number
  direction: string
  type: string
  filtered: number
  unfiltered: number
  rssi: number
  noise: number
}

const IdSchema = new mongoose.Schema({ $oid: { type: String, required: true } })
export const ReadingSchema = new mongoose.Schema({
  _id: { type: IdSchema, required: true },
  device: { type: String, required: true },
  date: { type: Number, required: true },
  dateString: { type: String, required: true },
  sgv: { type: Number, required: true },
  direction: { type: String, required: true },
  type: { type: String, required: true },
  filtered: { type: Number, required: true },
  unfiltered: { type: Number, required: true },
  rssi: { type: Number, required: true },
  noise: { type: Number, required: true }
})
const Reading = mongoose.model<IReading>('readings', ReadingSchema)

export const getReadings = async (startDate: number, endDate: number, startTime: number, endTime: number) => {
  const conditions = {
    $expr: {
      $and: [
        {
          $gte: ['$date', startDate]
        },
        {
          $lte: ['$date', endDate]
        },
        {
          $gte: [
            {
              $hour: {
                $dateFromString: { dateString: '$dateString' }
              }
            },
            startTime
          ]
        },
        {
          $lte: [
            {
              $hour: {
                $dateFromString: { dateString: '$dateString' }
              }
            },
            endTime
          ]
        }
      ]
    }
  }
  console.log(JSON.stringify(conditions, null, 2))
  return Reading.find(conditions).select('sgv date rssi noise')
}

/**
 * This accepts timestamps for startDate, endDate and 0-23 for startTime, endTime
 */
export const handler: Handler = (event: APIGatewayEvent, context: Context, callback: Callback) => {
  console.log('Inside mongo handler')
  const { startDate, endDate, startTime = 0, endTime = 23 } = event.queryStringParameters
  return getReadings(+startDate, +endDate, +startTime, +endTime).then(readings => {
    if (readings?.length > 0) {
      console.log(`Retrieved ${readings.length} readings from database`, 200)
      return wrap(readings)
    } else {
      console.log("Didn't retrieve any testReadings from DB query")
      return wrap({ error: "Didn't retrieve any testReadings from DB query" }, 400)
    }
  })
}
