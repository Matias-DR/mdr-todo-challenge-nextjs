import { decode } from 'jsonwebtoken'
import { parse } from 'cookie'

/**
 * Extracts the access token data from the access token decoded from request headers.
 * @arg {any} context - The server context object to extract the access token from.
 */
export default function extractUserTokenFromServerContext (context: {
  req: { headers: { cookie: string } }
}): string | { username: string, email: string } {
  const cookies = parse(
    context.req.headers.cookie.length > 0 ? context.req.headers.cookie : ''
  )
  const access = decode(cookies.access) as
    | string
    | { username: string, email: string }
  return access
}
