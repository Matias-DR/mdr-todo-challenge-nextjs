import HomeContextProvider from '@/contexts/home'

import { HeaderComponent } from '@/components'
import { NotificationComponent } from '@/components'
import {
  type ReactNode,
  useState
} from 'react'
import { useNotificationContext } from '@/contexts'


interface Props {
  username: string,
  email: string,
  children: ReactNode
}

export default function SignedLayout({
  username,
  email,
  children
}: Props) {
  const [timer, setTimer] = useState<number>()
  const {
    message,
    setMessage,
    status
  } = useNotificationContext()

  return <main className='flex flex-col'>
    <NotificationComponent
      message={message}
      setMessage={setMessage}
      status={status}
    />
    <HomeContextProvider
      username={username}
      email={email}
    >
      <HeaderComponent />
      <div className='w-full flex-grow flex flex-col scrollbar-y-zinc'>
        {children}
      </div>
    </HomeContextProvider>
  </main>
}
