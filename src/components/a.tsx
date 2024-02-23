import { type ReactNode } from 'react'

interface Props {
  href: string
  children: ReactNode
  className?: string
}

export default function AComponent ({
  href,
  children,
  className
}: Props): React.ReactNode {
  return (
    <a
      className={`
      ${className} inline-block align-baseline font-bold text-indigo-500 
      hover:text-indigo-800
    `}
      href={href}
    >
      {children}
    </a>
  )
}
