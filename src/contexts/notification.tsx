import { NotificationComponent } from '@/components'
import {
  createContext,
  ReactNode,
  useContext,
  useState
} from 'react'

export enum NotificationStatus {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info'
}

type Theme = Record<
  NotificationStatus,
  {
    div: string
    p: string
    shape: string
  }
>

const theme: Theme = {
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

const NotificationContext = createContext({
  message: '',
  setMessage: (value: string) => { },
  status: NotificationStatus.INFO,
  setStatus: (value: NotificationStatus) => { }
})

interface Props {
  children: ReactNode
}

export default function NotificationContextProvider({ children }: Props) {
  const [message, setMessage] = useState<string>('')
  const [status, setStatus] = useState<NotificationStatus>(
    NotificationStatus.INFO
  )

  return <NotificationContext.Provider value={{
    message,
    setMessage,
    status,
    setStatus
  }}>
    {children}
  </NotificationContext.Provider>
}

export const useNotificationContext = () => {
  return useContext(NotificationContext)
}
