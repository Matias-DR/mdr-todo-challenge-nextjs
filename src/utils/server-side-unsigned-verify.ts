import { extractUserFromServerContext } from '.'


interface Redirect {
  destination: string
}

interface Return {
  props?: {}
  redirect?: Redirect
}

export default function serverSideUnsignedVerify(context: any) {
  const user = extractUserFromServerContext(context)
  if (user) return { redirect: { destination: '/' } }
  return { props: {} }
}
