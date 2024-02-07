import SignedLayout from '@/layouts/signed.layout'

import { TaskSetComponent } from '@/components/todo'


export default function Home() {
  return <SignedLayout>
    <div className='w-full flex-grow p-2'>
      <TaskSetComponent />
    </div>
  </SignedLayout>
}
