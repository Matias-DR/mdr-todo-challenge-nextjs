import { extractAccessFromRequest } from '@/utils'
import axios from 'axios'

import type {
  NextApiRequest,
  NextApiResponse
} from 'next'

const url = process.env.API_HOST + `task/`

const methods: Record<string, Function> = {
  'GET': async (
    req: NextApiRequest,
    res: NextApiResponse
  ) => {
    const query = ''
    const access = extractAccessFromRequest(req)

    await axios.get(
      url,
      {
        headers: {
          Authorization: `Bearer ${access}`
        }
      }
    )

      .then((response: any) => {
        res
          .status(response.status)
          .json(response.data)
      })

      .catch((error: any) => {
        console.log(error.response.data)
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
        console.log('ESTO QUEDA DE ERROR', error.response.data)
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
    console.log('ESTO TENEMOS COMO PK', pk)
    axios.delete(
      `${url}${pk}/`,
      { headers: { Authorization: `Bearer ${access}` } }
    )
      .then((response: any) => {
        res.status(response.status).json({})
      })
      .catch((error: any) => {
        console.log('ESTO QUEDA DE ERROR', error.response.data)
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
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const method = req.method
  methods[method!](req, res)
}
