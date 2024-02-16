import { NotificationStatus } from '@/contexts'
import {
  ReactNode,
  useEffect
} from 'react'


/**
 * The properties of the Notification component
 * @arg {string} message - The message to display
 * @arg {function} setMessage - The function to set the message
 * @arg {NotificationStatus} status - The status of the message
 */
interface Props {
  message: string
  setMessage: (message: string) => void
  status: NotificationStatus
}

const theme = {
  success: {
    div: 'border-green-500',
    p: 'text-green-500',
    shape: 'border-l-green-500'
  },
  error: {
    div: 'border-red-500',
    p: 'text-red-500',
    shape: 'border-l-red-500'
  },
  warning: {
    div: 'border-orange-500',
    p: 'text-orange-500',
    shape: 'border-l-orange-500'
  },
  info: {
    div: 'border-blue-500',
    p: 'text-blue-500',
    shape: 'border-l-blue-500'
  }
}

/**
 * Notification component that allows to display a info, warning, error or
 * success message for 5 seconds.
 * @arg {Props} props - The properties of the component
 */
export default function NotificationComponent({
  message,
  setMessage,
  status
}: Props): ReactNode {

  // Set time out to remove the message
  useEffect(() => {
    if (message != '') {
      const timeout = setTimeout(() => {
        setMessage('')
      }, 5000)
      return () => clearTimeout(timeout)
    }
  }, [message])

  return <div className={`
    ${message ? 'absolute' : 'hidden'}
    ${theme[status].div}
    left-1 sm:left-10 bottom-10
    max-w-[93%] sm:max-w-[40rem] h-10
    ps-8 pe-4 py-2
    font-bold
    bg-zinc-800
    border-2
  `}
  >

    {/* First triangle shape */}
    <div className='
      absolute z-10
      -top-[1px] -left-[2px]
      border-[1.187rem] border-solid
      border-transparent border-l-zinc-900
    '/>
    <div className='
      absolute z-10
      top-[1px] -left-[2px]
      border-[1.187rem] border-solid
      border-transparent border-l-zinc-900
    '/>
    <div className='
      absolute z-10
      top-[0px] -left-[1px]
      border-[1.187rem] border-solid
      border-transparent border-l-zinc-900
    '/>
    <div className={`
      ${theme[status].shape}
      absolute
      -top-[2px] left-[0px]
      border-[1.3rem] border-solid
      border-transparent border-l-red-500
    `} />

    {/* Message */}
    <p className={`
      ${theme[status].p}
      size-full
      truncate
    `}>
      {message}
    </p>

    {/* Second triangle shape */}
    <div className='
      absolute z-10
      top-[0px] -right-[36px]
      border-[1.187rem] border-solid
      border-transparent border-l-zinc-800
    '/>
    <div className={`
      ${theme[status].shape}
      absolute
      -top-[2px] -right-[42px]
      border-[1.3rem] border-solid
      border-transparent
    `} />
    <div className='
      absolute z-10
      top-[0px] -right-[37px]
      border-[1.187rem] border-solid
      border-transparent border-l-zinc-800
    '/>
  </div>
}
