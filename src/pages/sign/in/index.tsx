import { serverSideUnsignedVerify } from '@/utils'
import { SigninFormComponent } from '@/components/sign'
import { UnsignedLayout } from '@/layouts'

export default function SigninPage (): React.ReactNode {
  return (
    <UnsignedLayout>
      <SigninFormComponent />
    </UnsignedLayout>
  )
}

export function getServerSideProps (context: {
  req: { headers: { cookie: string } }
}): { props: unknown } | { redirect: { destination: string } } {
  return serverSideUnsignedVerify(context)
}
