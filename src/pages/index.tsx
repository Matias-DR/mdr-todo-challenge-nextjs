import SignedLayout from '@/layouts/signed'

import { TaskSetComponent } from '@/components/todo'
import { serverSideSignedVerify } from '@/utils'


interface Props {
  username: string
  email: string
}

export default function Home({
  username,
  email
}: Props) {
  return <SignedLayout
    username={username}
    email={email}
  >
    <div className='w-full flex-grow p-2'>
      <TaskSetComponent />
    </div>
  </SignedLayout>
}

export async function getServerSideProps(context: any) {
  return serverSideSignedVerify(context)
}
