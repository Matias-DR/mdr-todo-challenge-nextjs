import {
  decode,
  JwtPayload
} from 'jsonwebtoken'
import { parse } from 'cookie'


/**
 * Extracts the user data from the access token decoded from request headers.
 * @arg {any} context - The server context object to extract the user from.
 */
export default function extractUserFromServerContext(context: any): JwtPayload {
  const cookies = parse(context.req.headers.cookie || '')
  const access = <JwtPayload>decode(cookies.access)
  return access
}
