import { randomUUID } from 'node:crypto'
import { Database } from "./database.js"
import { buildRoutePath } from "./utils/build-route-path.js"
import { csvReader } from './utils/csv-reader.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (request, response) => {

      const { search } = request.query

      const tasks = database.select('tasks', search ? {
        title: search,
        description: search,
      } : null)

      return response.writeHead(200).end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (request, response) => {
      if(!request.body) {
        csvReader(database)
      } else {
        const { title, description } = request.body

        if(!title || !description) {
          throw new Error('Title and Description are required')
        }

        const task = { id: randomUUID(), title, description, completed_at: null }
        database.insert('tasks', task)
      }
      

      return response.writeHead(201).end()
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (request, response) => {
      const { id } = request.params
      const { title, description } = request.body

      if(!title || !description) {
        throw new Error('Title and Description are required')
      }

      const [task] = database.select('tasks', {
        id
      })

      if(!task) {
        throw new Error('Provided id does not exist!')
      }

      database.update('tasks', id, { title, description })
      
      return response.writeHead(200).end()
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (request, response) => {
      const { id } = request.params

      const [task] = database.select('tasks', {
        id
      })

      if(!task) {
        throw new Error('Provided id does not exist!')
      }

      const completed_at = task.completed_at ? null : new Date()

      database.update('tasks', id, { completed_at })
      
      return response.writeHead(200).end()
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (request, response) => {
      const { id } = request.params

      database.delete('tasks', id)

      return response.writeHead(200).end()
    }
  },
]