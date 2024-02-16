import { NotificationComponent } from '@/components'
import { ReactNode } from 'react'
import { useNotificationContext } from '@/contexts'

import Link from 'next/link'


interface Props {
  children: ReactNode
}

export default function UnsignedLayout({ children }: Props) {
  const {
    message,
    setMessage,
    status
  } = useNotificationContext()

  return <main className='
    relative
    flex justify-center items-center
  '>
    <NotificationComponent
      message={message}
      setMessage={setMessage}
      status={status}
    />
    <div className='
      max-w-[80%] sm:w-full h-fit
      flex justify-center items-center
    '>
      {children}
    </div>
    <p className='absolute bottom-0 text-center text-gray-500 text-xs'>
      <Link href='/rights'>&copy;2024 MDR. Todos los derechos reservados.</Link>
    </p>
  </main>
}
