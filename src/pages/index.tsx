import SignedLayout from '@/layouts/signed'

import { TaskSetComponent } from '@/components/task'
import { serverSideSignedVerify } from '@/utils'

interface Props {
  username: string
  email: string
}

export default function Home ({ username, email }: Props): React.ReactNode {
  return (
    <SignedLayout username={username} email={email}>
      <div className="w-full flex-grow p-2">
        <TaskSetComponent />
      </div>
    </SignedLayout>
  )
}

export function getServerSideProps (context: {
  req: { headers: { cookie: string } }
}):
  | { redirect: { destination: string } }
  | { props: { username: string, email: string } } {
  return serverSideSignedVerify(context)
}
