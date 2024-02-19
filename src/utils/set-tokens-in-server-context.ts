import type { NextApiResponse } from 'next'
import { NextRequest } from 'next/server'
import { serialize } from 'cookie'
import {
  JwtPayload,
  decode
} from 'jsonwebtoken'


export default function setTokensInServerContext(
  refresh: string,
  access: string,
  res?: NextApiResponse,
  reqServer?: NextRequest
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
  if (reqServer) {
    reqServer.cookies.set('access', serializedAccess)
  } else {
    if (res) {
      res.setHeader(
        'Set-Cookie',
        [
          serializedAccess,
          serializedRefresh
        ]
      )
    }
  }
}
