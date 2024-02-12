import { ReactNode } from 'react'
import Link from 'next/link'


interface Props {
  children: ReactNode
}

export default function UnsignedLayout({ children }: Props) {
  return <main className='relative flex justify-center items-center'>
    {children}
    <p className='absolute bottom-0 text-center text-gray-500 text-xs'>
      <Link href='/rights'>&copy;2024 MDR. Todos los derechos reservados.</Link>
    </p>
  </main>
}