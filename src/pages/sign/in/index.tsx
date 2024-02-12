import { serverSideUnsignedVerify } from '@/utils'
import { SigninFormComponent } from '@/components/sign'
import { UnsignedLayout } from '@/layouts'


export default function SigninPage() {
  return <UnsignedLayout>
    <SigninFormComponent />
  </UnsignedLayout>
}

export async function getServerSideProps(context: any) {
  return serverSideUnsignedVerify(context)
}
