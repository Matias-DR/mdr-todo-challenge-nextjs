import type {
  NextApiRequest,
  NextApiResponse
} from 'next'


/**
 * Async handler function that removes the cookie from the response
 * @arg {NextApiRequest} req
 * @arg {NextApiResponse} res
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  res.setHeader('Set-Cookie', '')
  res.status(200).json({})
}
