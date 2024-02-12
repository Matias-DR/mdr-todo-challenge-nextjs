import axios from 'axios'

import type {
  NextApiRequest,
  NextApiResponse
} from 'next'
import { SignupFormData } from '@/components/sign/up/form'


/**
 * Async handler function that sends the signup form data to the external server.
 * Filters the response and sends the appropriate status code and message
 * @arg {NextApiRequest} req
 * @arg {NextApiResponse} res
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const formData: SignupFormData = req.body
  const url = process.env.API_HOST + 'user/'
  await axios.post(url, formData)
    .then((response: any) => {
      res.status(response.status).json(response.data)
    })
    .catch((error: any) => {
      let message = ''
      try {
        Object.entries(error.response.data).map((entry: any) =>
          message = message.concat(entry[1].join('. '))
        )
      } catch {
        message = 'Ah ocurrido un error inesperado, por favor intente nuevamente.'
      }
      res.status(error.response.status).json({ message })
    })
}
