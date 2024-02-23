import { extractUserTokenFromServerContext } from '.'

export default function serverSideUnsignedVerify (context: {
  req: { headers: { cookie: string } }
}): { props: unknown } | { redirect: { destination: string } } {
  const user = extractUserTokenFromServerContext(context)
  if (typeof user === 'string') return { redirect: { destination: '/' } }
  return { props: {} }
}
