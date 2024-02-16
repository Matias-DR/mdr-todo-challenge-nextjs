import {
  decode,
  JwtPayload
} from 'jsonwebtoken'
import { parse } from 'cookie'


/**
 * Extracts the access token data from the access token decoded from request headers.
 * @arg {any} context - The server context object to extract the access token from.
 */
export default function extractUserTokenFromServerContext(context: any): JwtPayload {
  const cookies = parse(context.req.headers.cookie || '')
  const access = <JwtPayload>decode(cookies.access)
  return access
}
