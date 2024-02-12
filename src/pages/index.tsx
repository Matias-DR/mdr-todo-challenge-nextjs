import SignedLayout from '@/layouts/signed'

import { TaskSetComponent } from '@/components/todo'
import { serverSideSignedVerify } from '@/utils'


export default function Home() {
  return <SignedLayout>
    <div className='w-full flex-grow p-2'>
      <TaskSetComponent />
    </div>
  </SignedLayout>
}

export async function getServerSideProps(context: any) {
  return serverSideSignedVerify(context)
}
