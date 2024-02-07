import { ReactNode } from 'react'


interface Props {
  href: string
  children: ReactNode
  className?: string
}

export default function AComponent({
  href,
  children,
  className
}: Props) {
  return <a
    className={`
      ${className} inline-block align-baseline font-bold text-blue-500 
      hover:text-blue-800
    `}
    href={href}
  >
    {children}
  </a>
}