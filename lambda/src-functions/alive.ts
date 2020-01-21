import { Handler, APIGatewayEvent, Context, Callback } from 'aws-lambda'
import { wrap } from './lib'

export const handler: Handler = (event: APIGatewayEvent, context: Context, callback: Callback) => {
  console.log(`Method is ${event.httpMethod}.`)
  callback(null, wrap({ message: 'Lambda functions are alive' }))
}
