import axios from 'axios'

import {
  extractRefreshFromRequest,
  setTokensInServerContext
} from '@/utils'
import type {
  NextApiRequest,
  NextApiResponse
} from 'next'


export type Handler = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void>

export type BadResponse = {
  status: number,
  message: string
}

/**
 * Middleware function that refreshes the access token if it has expired
 * @arg {Handler} handler - The endpoint handler function to be wrapped
 */
export default function refresh(handler: Handler): Handler {

  // Return the wrapped handler function to catch unauthorized errors
  return async (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<void> => await handler(
    req,
    res
  )

    .catch((error: any) => {

      // If the access token has expired, refresh it
      if (error.status === 401) {

        const url = process.env.API_HOST + `token/refresh/`

        // Get refresh token from the request
        const refresh = extractRefreshFromRequest(req)

        // Send the refresh token to the server to get a new access token
        return axios.post(url, { refresh })

          // If the refresh token is valid, set the new access token in the
          // server context and retry the original request
          .then(async (res: any) => {
            const { access } = res.data

            setTokensInServerContext(
              res,
              refresh,
              access
            )

            return await handler(
              req,
              res
            )
              .catch((error: any) => res.status(error.status).json(error.data))
          })

          // If the refresh token is invalid, return the original error
          .catch((
            error: any
          ) => {
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
      } else {
        // Return the original error if the status code is not 401
        res.status(error.status).json(error.data)
      }
    })
}
