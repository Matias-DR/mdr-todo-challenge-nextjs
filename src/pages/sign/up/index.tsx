import SignupFormComponent from '@/components/sign/up/form.component'
import UnsignedLayout from '@/layouts/unsigned.layout'


export default function SignupPage() {
  return <UnsignedLayout>
    <SignupFormComponent />
  </UnsignedLayout>
}
