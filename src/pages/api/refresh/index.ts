import { extractAccessFromRequest } from '@/utils'
import axios from 'axios'

import type {
  NextApiRequest,
  NextApiResponse
} from 'next'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = process.env.API_HOST + `token/refresh/`
  const refresh = 

  setTimeout(() => { }, 60000)
  setInterval(() => { }, 60000)
}