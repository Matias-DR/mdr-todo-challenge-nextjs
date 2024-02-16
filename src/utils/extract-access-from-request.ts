import { parse } from 'cookie'


/**
 * Extracts the access token from the access token decoded from request headers.
 * @arg {any} req - The request object to extract the access token from.
 */
export default function extractAccessFromRequest(req: any): string {
  const cookies = parse(req.headers.cookie || '')
  return cookies.access
}
