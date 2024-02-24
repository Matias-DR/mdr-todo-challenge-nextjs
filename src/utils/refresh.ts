import type { NextApiRequest, NextApiResponse } from 'next';

import { deleteCookie, getCookie } from 'cookies-next';
import { setToken } from '.';

const BACK_HOST = process.env.BACK_HOST;

/**
 * Hanlder function that refreshes the access token if it has expired before
 * calling the endpoint handler
 */
export default function refresh(
  handled: (req: NextApiRequest, res: NextApiResponse) => Promise<void>,
): (req: NextApiRequest, res: NextApiResponse) => Promise<void> {
  return async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ): Promise<void> {
    let refresh = getCookie('refresh', { req, res });
    let access = getCookie('access', { req, res });
    let result = true;
    // If the access token has expired
    if (access === undefined || (typeof access === 'string' && access.length === 0)) {
      // If the refresh token is available, try to refresh access
      if (typeof refresh === 'string' && refresh.length > 0) {
        await fetch(BACK_HOST + '/api/token/refresh/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh, access }),
        })
          .then(async (response: Response) => {
            // If the refresh token is available, refresh access
            await response.json().then(({ access }: { access: string }) => {
              setToken('access', access, req, res);
            });
          })
          .catch(() => {
            // If the refresh token is not available, turn the result to false
            result = false;
          });
      } else {
        // If the refresh token is not available, turn the result to false
        result = false;
      }
    }
    if (result) {
      // If the access token are available
      handled(req, res);
    } else {
      // If the access and refresh tokens are not available, clear the cookies and
      // redirect to the signin page
      deleteCookie('access', { res });
      deleteCookie('refresh', { res });
      res.redirect('/sign/in');
    }
  };
}
