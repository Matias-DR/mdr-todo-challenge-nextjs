import { setCookie } from 'cookies-next';
import { decode } from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';

const setToken = (
  name: string,
  token: string,
  req: NextApiRequest,
  res: NextApiResponse,
  expiresAt?: Date,
) => {
  const { exp } = decode(token) as { exp: number };
  const date = new Date(exp * 1000);
  setCookie(name, token, { req, res, expires: expiresAt ? expiresAt : date });
};

export default setToken;
