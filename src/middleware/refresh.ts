import axios from 'axios'

import {
  extractRefreshFromRequest,
  setTokensInServerContext
} from '@/utils'

import type {
  NextApiRequest,
  NextApiResponse
} from 'next'


type Handler = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void>

/**
 * Middleware function that refreshes the access token if it has expired
 * @arg {Handler} handler - The endpoint handler function to be wrapped
 */
export default function refresh(handler: Handler): Handler {

  return async (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<any> => await handler(
    req,
    res
  )

    // If the access token is still valid, return the response as is
    .then((res: any) => res)

    // If the access token has expired, refresh it
    .catch((error: any) => {
      if (error.repsonse.status === 401) {
        const url = process.env.API_HOST + `token/refresh/`
        const refresh = extractRefreshFromRequest(req)

        // Send the refresh token to the server to get a new access token
        return axios.post(url, { refresh })

          // If the refresh token is valid, set the new access token in the server context
          .then((res: any) => {
            const { access } = res.data
            setTokensInServerContext(
              res,
              refresh,
              access
            )

            // Retry the original request with the new access token
            return handler(
              req,
              res
            )
          })

          // Return the original error if the refresh token is invalid
          .catch((
            error: any
          ) => res.status(error.response.status).json(error.response.data))
      }
      // Return the original error if the status code is not 401
      res.status(error.response.status).json(error.response.data)
    })
}
