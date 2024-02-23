import { serverSideUnsignedVerify } from '@/utils'
import { SignupFormComponent } from '@/components/sign'
import { UnsignedLayout } from '@/layouts'

export default function SignupPage (): React.ReactNode {
  return (
    <UnsignedLayout>
      <SignupFormComponent />
    </UnsignedLayout>
  )
}

export function getServerSideProps (
  context: { req: { headers: { cookie: string } } }
): { props: unknown } | { redirect: { destination: string } } {
  return serverSideUnsignedVerify(context)
}
