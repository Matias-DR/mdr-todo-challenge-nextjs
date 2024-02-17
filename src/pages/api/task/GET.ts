import axios from 'axios'

import { extractAccessFromRequest } from '@/utils'
import { BadResponse } from '@/middleware'
import type {
  NextApiRequest,
  NextApiResponse
} from 'next'


/**
 * Async handler function which obtains the tasks of the signed user
 * @arg {NextApiRequest} req
 * @arg {NextApiResponse} res
 */
export default async function get(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | BadResponse> {
  const query = ''
  const url = process.env.API_HOST + `task/${query}`
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
}
