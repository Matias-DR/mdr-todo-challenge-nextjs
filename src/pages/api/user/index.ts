import axios from 'axios'

import type {
  NextApiRequest,
  NextApiResponse
} from 'next'
import { UpdateFormData } from '@/components/user'


/**
 * Async handler function that sends the update form data to the external server.
 * @arg {NextApiRequest} req
 * @arg {NextApiResponse} res
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const formData: UpdateFormData = req.body
  const url = process.env.API_HOST + `user/${7}/`

  await axios.patch(url, formData)

    .then((response: any) => {
      res
        .status(response.status)
        .json({ message: 'Usuario actualizado exitosamente.' })
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
