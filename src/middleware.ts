import axios from 'axios'

import { setTokensInServerContext } from '@/utils'
import type {
  NextApiRequest,
  NextApiResponse
} from 'next'
import { NextResponse } from 'next/server'
import { parse } from 'cookie'


/**
 * Middleware function that refreshes the access token if it has expired before
 * calling the endpoint handler
 */
export default function refresh(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookies = parse(req.headers.cookie || '')
  const {
    access,
    refresh
  } = cookies
  const accessExp = new Date(access.split(';')[1].trim().replace('Expires=', ''))
  if (new Date() >= accessExp) {
    const url = process.env.API_HOST + `token/refresh/`
    axios.post(
      url,
      { refresh }
    )
      .then(() => {
        // setTokensInServerContext(
        //   res,
        //   refresh,
        //   access
        // )
      })
      .catch(() => { })
  }
  NextResponse.next()
}
