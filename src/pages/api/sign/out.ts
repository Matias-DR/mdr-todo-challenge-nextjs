import type { NextApiRequest, NextApiResponse } from 'next';

import { deleteCookie } from 'cookies-next';

/**
 * Async handler function that removes the cookie from the response
 * @arg {NextApiRequest} req
 * @arg {NextApiResponse} res
 */
export default function handler(req: NextApiRequest, res: NextApiResponse): void {
  deleteCookie('refresh', { req, res });
  deleteCookie('access', { req, res });
  res.status(200).json({});
}
