import { extractUserFromServerContext } from '.'


interface Redirect {
  destination: string
}

interface Return {
  props?: {}
  redirect?: Redirect
}

export default function serverSideSignedVerify(context: any): Return {
  const user = extractUserFromServerContext(context)
  if (!user) return { redirect: { destination: '/sign/in' } }
  const props = {
    username: user.username,
    email: user.email
  }
  return { props }
}
