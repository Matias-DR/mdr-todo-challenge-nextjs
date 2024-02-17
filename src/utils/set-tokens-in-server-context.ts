import type { NextApiResponse } from 'next'
import { serialize } from 'cookie'
import {
  JwtPayload,
  decode
} from 'jsonwebtoken'


export default function setTokensInServerContext(
  res: NextApiResponse,
  refresh: string,
  access: string
) {
  const { exp: accessExp } = <JwtPayload>decode(access)
  const { exp: refreshExp } = <JwtPayload>decode(refresh)
  const serializedAccess = serialize(
    'access',
    access,
    {
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(accessExp! * 1000),
      path: '/'
    }
  )
  const serializedRefresh = serialize(
    'refresh',
    refresh,
    {
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(refreshExp! * 1000),
      path: '/'
    }
  )
  res.setHeader(
    'Set-Cookie',
    [
      serializedAccess,
      serializedRefresh
    ]
  )
}
