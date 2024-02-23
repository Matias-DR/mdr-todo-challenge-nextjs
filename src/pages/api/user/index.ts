import axios from 'axios'

import { decode } from 'jsonwebtoken'
import { type UpdateFormData } from '@/components/user'
import { extractAccessFromRequest } from '@/utils'
import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * Async handler function that sends the update form data to the external server.
 * @arg {NextApiRequest} req
 * @arg {NextApiResponse} res
 */
export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const formData = req.body as UpdateFormData
  const access = extractAccessFromRequest(req)
  const { pk, email, username } = decode(access) as { pk: string, email: string, username: string }
  const url = process.env.API_HOST + `user/${pk}/`

  if (formData.email === '') {
    formData.email = email
  }

  const data = {
    ...formData,
    username
  }

  console.log(pk, data)

  await axios
    .patch(url, data, { headers: { Authorization: `Bearer ${access}` } })

    .then((response: { status: number }) => {
      res
        .status(response.status)
        .json({ message: 'Usuario actualizado exitosamente.' })
    })

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
        } catch {
          message =
            'Ah ocurrido un error inesperado, por favor intente nuevamente.'
        }
        res.status(error.response.status).json({ message })
      }
    )
}
