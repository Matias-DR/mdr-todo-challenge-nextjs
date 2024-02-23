import { extractUserTokenFromServerContext } from '.'

export default function serverSideSignedVerify (context: {
  req: { headers: { cookie: string } }
}):
  | { redirect: { destination: string } }
  | { props: { username: string, email: string } } {
  const access = extractUserTokenFromServerContext(context)
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (typeof access === 'string' || access === null || access === undefined) {
    return { redirect: { destination: '/sign/in' } }
  }
  return {
    props: {
      username: access.username,
      email: access.email
    }
  }
}
