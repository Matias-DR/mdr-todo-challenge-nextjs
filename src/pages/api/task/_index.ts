import axios from 'axios'

import { extractAccessFromRequest } from '@/utils'
import type {
  NextApiRequest,
  NextApiResponse
} from 'next'
import { refresh } from '@/middleware'


const url = process.env.API_HOST + `task/`

const methods: Record<string, Function> = {
  'GET': async (
    req: NextApiRequest,
    res: NextApiResponse
  ) => {
    const query = ''
    const access = extractAccessFromRequest(req)

    return await axios.get(
      url,
      {
        headers: {
          Authorization: `Bearer ${access}`
        }
      }
    )

      .then((response: any) => res
        .status(response.status)
        .json(response.data)
      )

      .catch((error: any) => {
        let message = ''
        try {
          Object.entries(error.response.data).map((entry: any) => {
            const entrySlice = entry.slice(1)
            message = message.concat(entrySlice.join('. '))
          })
        } catch {
          message = 'Ah ocurrido un error inesperado, por favor intente nuevamente.'
        }
        return {
          status: error.response.status,
          data: message
        }
      })
  },
  'POST': async (
    req: NextApiRequest,
    res: NextApiResponse
  ) => {
    const access = extractAccessFromRequest(req)
    const task = req.body

    axios.post(
      url,
      task,
      {
        headers: {
          Authorization: `Bearer ${access}`
        }
      }
    )
      .then((response: any) => res.status(response.status).json({}))
      .catch((error: any) => {
        let message = ''
        try {
          Object.entries(error.response.data).map((entry: any) => {
            const entrySlice = entry.slice(1)
            message = message.concat(entrySlice.join('. '))
          })
        } catch {
          message = 'Ah ocurrido un error inesperado, por favor intente nuevamente.'
        }
        res.status(error.response.status).json({ message })
      })
  },
  'PATCH': async (
    req: NextApiRequest,
    res: NextApiResponse
  ) => { },
  'PUT': async (
    req: NextApiRequest,
    res: NextApiResponse
  ) => { },
  'DELETE': async (
    req: NextApiRequest,
    res: NextApiResponse
  ) => {
    const access = extractAccessFromRequest(req)
    const { pk } = req.query
    axios.delete(
      `${url}${pk}/`,
      { headers: { Authorization: `Bearer ${access}` } }
    )
      .then((response: any) => {
        res.status(response.status).json({})
      })
      .catch((error: any) => {
        let message = ''
        try {
          Object.entries(error.response.data).map((entry: any) => {
            const entrySlice = entry.slice(1)
            message = message.concat(entrySlice.join('. '))
          })
        } catch {
          message = 'Ah ocurrido un error inesperado, por favor intente nuevamente.'
        }
        res.status(error.response.status).json({ message })
      })
  }
}

/**
 * Async handler function which obtains the tasks of the signed user
 * @arg {NextApiRequest} req
 * @arg {NextApiResponse} res
 */
async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> {
  const method = req.method
  return methods[method!]
}

export default refresh(handler)
