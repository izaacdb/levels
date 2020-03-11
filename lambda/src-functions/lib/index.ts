const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Credentials': 'true',
  'Content-Type': 'application/json'
}

export interface ResponseWrapper {
  headers: typeof headers
  statusCode: number
  body: string
}

export const wrap = (body: object, statusCode = 200): ResponseWrapper => {
  return { headers, statusCode, body: JSON.stringify(body) }
}
