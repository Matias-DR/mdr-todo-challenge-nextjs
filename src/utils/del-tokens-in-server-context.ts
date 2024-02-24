import type { NextApiResponse } from 'next'
import { serialize } from 'cookie'

export default function delTokensInServerContext (res: NextApiResponse): void {
  const refresh = serialize('refresh', '', {
    secure: process.env.NODE_ENV === 'production',
    path: '/'
  })
  const access = serialize('access', '', {
    secure: process.env.NODE_ENV === 'production',
    path: '/'
  })
  res.setHeader('Set-Cookie', [refresh, access])
}
