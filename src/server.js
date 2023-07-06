import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'

const server = http.createServer(async (request, response) => {

  const { method, url } = request

  await json(request, response)

  const route = routes.find(route => route.method === method && route.path.test(url))

  if(!route) {
    return response.writeHead(404).end(JSON.stringify('Not found'))
  }

  const routeParams = request.url.match(route.path)

  const { query, ...params } = routeParams.groups

  request.params = params
  request.query = query ? extractQueryParams(query) : {}

  try {
    return route.handler(request, response)
  } catch (error) {
    return response.writeHead(404).end(JSON.stringify(error.message))
  }
})

server.listen(3333, () => {
  console.log('Server is running on port 3333')
})