import get from './GET'

import {
  Handler,
  refresh
} from '@/middleware'
import type {
  NextApiRequest,
  NextApiResponse
} from 'next'


const handlers: Record<string, Handler> = {
  'GET': get
}

/**
 * Async handler function which obtains the tasks of the signed user
 * @arg {NextApiRequest} req
 * @arg {NextApiResponse} res
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> {
  return refresh(handlers[req.method as string])
}
