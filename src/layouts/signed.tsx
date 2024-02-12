import HomeContextProvider from '@/contexts/home'

import { HeaderComponent } from '@/components'
import { ReactNode } from 'react'


interface Props {
  children: ReactNode
}

export default function SignedLayout({ children }: Props) {
  return <main className='flex flex-col'>
    <HomeContextProvider>
      <HeaderComponent />
      <div className='w-full flex-grow flex flex-col scrollbar-y-zinc'>
        {children}
      </div>
    </HomeContextProvider>
  </main>
}
