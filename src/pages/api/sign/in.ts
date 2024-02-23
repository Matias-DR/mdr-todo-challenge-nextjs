import axios from 'axios'

import type { NextApiRequest, NextApiResponse } from 'next'
import { setTokensInServerContext } from '@/utils'
import { type SignupFormData } from '@/components/sign/up/form'

/**
 * Async handler function that sends the signin form data to the external server.
 * Filters the response and sends the appropriate status code and message
 * @arg {NextApiRequest} req
 * @arg {NextApiResponse} res
 */
export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const formData = req.body as SignupFormData
  const url = process.env.API_HOST + 'token/'

  await axios
    .post(url, formData)

    .then(
      (response: {
        data: { access: string, refresh: string }
        status: number
      }) => {
        const { access, refresh } = response.data
        setTokensInServerContext(refresh, access, res)
        res.status(response.status).json({})
      }
    )

    .catch(
      (error: {
        response: { data: Record<string, string[]>, status: number }
      }) => {
        let message = ''
        try {
          Object.entries(error.response.data).map(
            (entry: [string, unknown]): void => {
              const entrySlice = entry.slice(1)
              message = message.concat(entrySlice.join('. '))
              return undefined
            }
          )
          res.status(error.response.status).json({ message })
        } catch {
          message =
            'Ah ocurrido un error inesperado, por favor intente nuevamente.'
          res.status(500).json({ message })
        }
      }
    )
}
