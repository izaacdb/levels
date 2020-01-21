import dotenv from 'dotenv'
import { Handler, APIGatewayEvent, Context, Callback } from 'aws-lambda'
import * as mongoose from 'mongoose'
import { wrap } from './lib'

dotenv.config()
const { DBUSER, DBPASSWORD, DBURL, DBPORT, DBNAME } = process.env
const uri = `mongodb://${DBUSER}:${DBPASSWORD}@${DBURL}:${DBPORT}/${DBNAME}`


mongoose.connect(uri).then(() => {
  console.log('Successfully Connected!')
}).catch(e => {
  console.log(e.message)
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

export const getReadings = async (callback: Callback) => {
  const readings = await Reading.find()
  if (readings && readings.length > 0) {
    return readings.map(r => {
      return { sgv: r.sgv * 0.0555, date: r.date, rssi: r.rssi, noise: r.noise }
    })
  } else {
    console.log('An error occurred')
    callback('Something went wrong', wrap({ error: 'Something went wrong' }, 400))
  }
}

export const handler: Handler = (event: APIGatewayEvent, context: Context, callback: Callback) => {
  console.log('Inside mongo handler')
  return getReadings(callback).then(readings => {
    console.log(`Got ${readings.length} readings`)
    return wrap(readings)
  })
}
