import type { NextApiResponse } from 'next'
import { serialize } from 'cookie'
import { decode } from 'jsonwebtoken'

export default function setTokensInServerContext (
  refresh: string,
  access: string,
  res: NextApiResponse
): void {
  const { exp: refreshExp } = decode(refresh) as { exp: number }
  const { exp: accessExp } = decode(access) as { exp: number }
  const serializedRefresh = serialize('refresh', refresh, {
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(refreshExp * 1000),
    path: '/'
  })
  const serializedAccess = serialize('access', access, {
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(accessExp * 1000),
    path: '/'
  })
  res.setHeader('Set-Cookie', [serializedRefresh, serializedAccess])
}
