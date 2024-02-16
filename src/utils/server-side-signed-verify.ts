import { extractUserTokenFromServerContext } from '.'


interface Redirect {
  destination: string
}

interface Return {
  props?: {}
  redirect?: Redirect
}

export default function serverSideSignedVerify(context: any): Return {
  const access = extractUserTokenFromServerContext(context)
  if (!access) return { redirect: { destination: '/sign/in' } }
  const props = {
    username: access.username,
    email: access.email
  }
  return { props }
}
