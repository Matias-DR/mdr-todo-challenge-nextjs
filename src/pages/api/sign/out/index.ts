import type {
  NextApiRequest,
  NextApiResponse
} from 'next'
import { serialize } from 'cookie'


/**
 * Async handler function that removes the cookie from the response
 * @arg {NextApiRequest} req
 * @arg {NextApiResponse} res
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const access = serialize(
    'access',
    '',
    {
      secure: process.env.NODE_ENV === 'production',
      path: '/'
    }
  )
  const refresh = serialize(
    'refresh',
    '',
    {
      secure: process.env.NODE_ENV === 'production',
      path: '/'
    }
  )
  res.setHeader(
    'Set-Cookie',
    [
      access,
      refresh
    ]
  )
  res.status(200).json({})
}
