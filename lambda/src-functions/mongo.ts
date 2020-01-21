import dotenv from 'dotenv'
import { Handler, APIGatewayEvent, Context, Callback } from 'aws-lambda'
import * as mongoose from 'mongoose'
import { wrap } from './lib'

dotenv.config()

const { DBUSER, DBPASSWORD, DBURL, DBPORT, DBNAME } = process.env

const uri = `mongodb://${DBUSER}:${DBPASSWORD}@${DBURL}:${DBPORT}/${DBNAME}`
console.log(uri)

mongoose.connect(uri, (err: any) => {
  if (err) {
    console.log(err.message)
  } else {
    console.log('Successfully Connected!')
  }
})

export interface IReading extends mongoose.Document {
  _id: {
    $oid: string
  },
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

export const getReadings = () => {
  Reading.find((err: any, readings: any) => {
    if (err) {
      console.log('error')
    } else {
      return readings.map(r => {
        return { sgv: r.sgv * 0.0555, date: r.date, rssi: r.rssi, noise: r.noise }
      })
    }
  })
}

export const handler: Handler = (event: APIGatewayEvent, context: Context, callback: Callback) => {
  console.log(`Method is ${event.httpMethod}.`)
  callback(null, wrap({ data: getReadings() }))
}
