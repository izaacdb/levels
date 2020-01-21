const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Credentials': 'true',
  'Content-Type': 'application/json'
}

export const wrap = (body: object, statusCode = 200) => {
  return { headers, statusCode, body: JSON.stringify(body) }
}
