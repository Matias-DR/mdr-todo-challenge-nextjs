import { JwtPayload, decode } from 'jsonwebtoken'
import { serialize } from 'cookie'
import axios from 'axios'

import type {
  NextApiRequest,
  NextApiResponse
} from 'next'
import { SignupFormData } from '@/components/sign/up/form'


/**
 * Async handler function that sends the signin form data to the server.
 * Filters the response and sends the appropriate status code and message
 * @arg {NextApiRequest} req
 * @arg {NextApiResponse} res
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const formData: SignupFormData = req.body
  const url = process.env.API_HOST + 'token/'

  await axios.post(url, formData)

    .then((response: any) => {
      const data = response.data
      const { exp } = <JwtPayload>decode(data.access)
      const cookie = serialize(
        'access',
        data.access,
        {
          secure: process.env.NODE_ENV === 'production',
          expires: new Date(exp! * 1000),
          path: '/'
        }
      )
      res.setHeader('Set-Cookie', cookie)
      res.status(200).json({})
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
