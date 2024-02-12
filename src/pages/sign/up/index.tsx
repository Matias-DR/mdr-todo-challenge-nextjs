import { serverSideUnsignedVerify } from '@/utils'
import { SignupFormComponent } from '@/components/sign'
import { UnsignedLayout } from '@/layouts'


export default function SignupPage() {
  return <UnsignedLayout>
    <SignupFormComponent />
  </UnsignedLayout>
}

export async function getServerSideProps(context: any) {
  return serverSideUnsignedVerify(context)
}
