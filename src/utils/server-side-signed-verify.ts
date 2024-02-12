import { decode } from 'jsonwebtoken'
import { parse } from 'cookie'


export default async function serverSideSignedVerify(context: any) {
  const cookies = parse(context.req.headers.cookie || '')
  const decoded = decode(cookies.access)
  if (!decoded) return { redirect: { destination: '/sign/in' } }
  return { props: {} }
}
