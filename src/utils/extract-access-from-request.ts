import { parse } from 'cookie'
import { type NextApiRequest } from 'next'

/**
 * Extracts the access token from the access token decoded from request headers.
 * @arg {NextApiRequest} req - The request object to extract the access token from.
 */
export default function extractAccessFromRequest (req: NextApiRequest): string {
  const cookies = parse(
    typeof req.headers.cookie === 'string' ? req.headers.cookie : ''
  )
  return cookies.access
}
