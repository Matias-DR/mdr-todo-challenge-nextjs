import axios from 'axios'

import {
  NextResponse,
  type NextRequest
} from 'next/server'
import { setTokensInServerContext } from '@/utils'


const exclude = [
  '/api/sign/in',
  '/sign/in',
  '/api/sign/up',
  '/sign/up',
  '/rights',
  '/sign/password-recuperation',
  '/_next/static',
  '/_next/image',
  '/favicon.ico'
]

const url = process.env.API_HOST + `token/refresh/`

/**
 * Middleware function that refreshes the access token if it has expired before
 * calling the endpoint handler
 */
export default async function refresh(
  req: NextRequest
) {
  // If the endpoint is not in the exclude list
  if (!exclude.some((path) => req.nextUrl.pathname.startsWith(path))) {

    // Get the access and refresh tokens from the cookies
    const access = req.cookies.get('access')
    const refresh = req.cookies.get('refresh')

    // If access has caduced
    if (access === undefined || access === null) {
      // And refresh has not caduced, then refresh access
      if (refresh !== undefined && refresh !== null) {
        try {
          const result = await axios.post(
            url,
            { refresh }
          )
          setTokensInServerContext(
            refresh.value,
            result.data.access,
            undefined,
            req
          )
        } catch {
          // If refresh has caduced or another error occurs, redirect to the
          // login page
          return NextResponse.redirect('/')
        }
      } else {
        // If refresh has caduced, redirect to the login page
        return NextResponse.redirect('/')
      }
    }
  }

  // If the endpoint is included in the exclude list or the access token has
  // not expired, continue with the request
  NextResponse.next()
}
