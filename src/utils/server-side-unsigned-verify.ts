import { decode } from 'jsonwebtoken'
import { parse } from 'cookie'


export default async function serverSideUnsignedVerify(context: any) {
  const cookies = parse(context.req.headers.cookie || '')
  const decoded = decode(cookies.access)
  if (decoded) return { redirect: { destination: '/' } }
  return { props: {} }
}
