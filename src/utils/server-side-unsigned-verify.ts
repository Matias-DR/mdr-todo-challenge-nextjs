import type { NextApiRequest, NextApiResponse } from 'next';

import { getCookie } from 'cookies-next';
import { extractUserFromToken } from '.';

export interface Redirect {
  redirect: { destination: string };
}

export interface Props {
  props: unknown;
}

/**
 * If the user is signed in, it redirects to the home page.
 * @arg {NextApiRequest} req
 * @arg {NextApiResponse} res
 */
export default function serverSideUnsignedVerify(
  req: NextApiRequest,
  res: NextApiResponse,
): Redirect | Props {
  const access = getCookie('access', { req, res }) as string;
  const user = extractUserFromToken(access);
  if (user !== undefined && user !== null) {
    return { redirect: { destination: '/' } };
  } else {
    return { props: {} };
  }
}
