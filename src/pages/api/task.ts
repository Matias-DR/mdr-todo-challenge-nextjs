import axios from 'axios'

import { extractAccessFromRequest } from '@/utils'
import type { NextApiRequest, NextApiResponse } from 'next'
import { type TaskType } from '@/components/task'

const url = process.env.API_HOST + 'task/'

/**
 * Async handler function which manages the requests to the task endpoint.
 * It allows to create, list, update and delete tasks.
 * @arg {NextApiRequest} req
 * @arg {NextApiResponse} res
 */
export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const method = req.method
  const access = extractAccessFromRequest(req)
  const config = { headers: { Authorization: `Bearer ${access}` } }
  const catched = (error: {
    response: { data: Record<string, string[]>, status: number }
  }): void => {
    try {
      let message = ''
      try {
        Object.entries(error.response.data).map(
          (entry: [string, unknown]): void => {
            const entrySlice = entry.slice(1)
            message = message.concat(entrySlice.join('. '))
            return undefined
          }
        )
      } catch {
        message =
          'Ah ocurrido un error inesperado, por favor intente nuevamente.'
      }
      res.status(error.response.status).json({ message })
    } catch {
      res.status(500).json({
        message:
          'Ah ocurrido un error inesperado, por favor intente nuevamente.'
      })
    }
  }

  // Task creation
  if (method === 'POST') {
    axios
      .post(url, req.body, config)
      .then((response: { data: TaskType, status: number }) => {
        res.status(response.status).json(response.data)
      })
      .catch(
        (error: {
          response: { data: Record<string, string[]>, status: number }
        }) => {
          catched(error)
        }
      )
  }

  // Task list
  if (method === 'GET') {
    const queries = req.query as Record<string, string>
    let query = ''
    if (Object.prototype.hasOwnProperty.call(queries, 'search')) {
      query = query + `search=${queries.search}&`
    }
    if (Object.prototype.hasOwnProperty.call(queries, 'completed')) {
      query = query + `completed=${queries.completed}&`
    }
    if (Object.prototype.hasOwnProperty.call(queries, 'created_from')) {
      query = query + `created_from=${queries.created_from}&`
    }
    if (Object.prototype.hasOwnProperty.call(queries, 'created_to')) {
      query = query + `created_to=${queries.created_to}&`
    }
    if (Object.prototype.hasOwnProperty.call(queries, 'ordering')) {
      query = query + `ordering=${queries.ordering}&`
    }
    if (query.length > 0) query = `?${query.slice(0, -1)}`
    await axios
      .get(url.replace(/\/$/, '') + query, config)
      .then((response: { data: TaskType[], status: number }) => {
        res.status(response.status).json(response.data)
      })
      .catch(
        (error: {
          response: { data: Record<string, string[]>, status: number }
        }) => {
          catched(error)
        }
      )
  }

  // Task update
  if (method === 'PUT' || method === 'PATCH') {
    const { pk } = req.query
    axios
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      .patch(`${url}${pk}/`, req.body, config)
      .then((response: { data: TaskType, status: number }) => {
        res.status(response.status).json(response.data)
      })
      .catch(
        (error: {
          response: { data: Record<string, string[]>, status: number }
        }) => {
          catched(error)
        }
      )
  }

  // Task deletion
  if (method === 'DELETE') {
    const { pk } = req.query
    axios
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      .delete(`${url}${pk}/`, config)
      .then((response: { status: number }) => {
        res.status(response.status).json({})
      })
      .catch(
        (error: {
          response: { data: Record<string, string[]>, status: number }
        }) => {
          catched(error)
        }
      )
  }
}
