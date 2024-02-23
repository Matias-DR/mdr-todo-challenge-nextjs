import { type NextApiRequest, type NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import { setTokensInServerContext } from '@/utils'

const URL = process.env.API_HOST + 'token/refresh/'
/**
 * Middleware function that refreshes the access token if it has expired before
 * calling the endpoint handler
 */
export default function refresh (req: NextApiRequest, res: NextApiResponse): void {
  let access: string
  let refresh: string
  try {
    access = String(req.cookies).split('; ')[0].split('=')[1]
  } catch {
    access = ''
  }
  try {
    refresh = String(req.cookies).split('; ')[1].split('=')[1]
  } catch {
    refresh = ''
  }
  if ((access.length === 0) && (refresh.length > 0)) {
    fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh })
    })
      .then(async (response: { json: () => Promise<{ access: string }> }) => {
        const { access } = await response.json()
        setTokensInServerContext(refresh, access, res)
      })
      .catch((error: unknown) => {
        // Habría que "signout" y redirigir a la página de inicio de sesión
        console.error(error)
      })
  }
  // If the endpoint is included in the exclude list or the access token has
  // not expired, continue with the request
  NextResponse.next()
}

export const config = {
  matcher: '/((?!api/sign/in|sign/in|api/sign/up|sign/up|api/sign/password_recuperation|api/rights|_next/static|_next/image|favicon.ico).*)'
}
