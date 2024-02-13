import HomeContextProvider from '@/contexts/home'

import { HeaderComponent } from '@/components'
import { ReactNode } from 'react'


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
  return <main className='flex flex-col'>
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
