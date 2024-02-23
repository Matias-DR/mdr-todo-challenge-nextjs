import { createContext, type ReactNode, useContext, useState } from 'react'

export type NotificationStatus = 'success' | 'error' | 'warning' | 'info'

const NotificationContext = createContext({
  message: '',
  setMessage: (value: string) => {},
  status: 'info' as NotificationStatus,
  setStatus: (value: NotificationStatus) => {},
  setNotification: (message: string, status: NotificationStatus) => {}
})

interface Props {
  children: ReactNode
}

export default function NotificationContextProvider ({
  children
}: Props): React.ReactNode {
  const [message, setMessage] = useState<string>('')
  const [status, setStatus] = useState<NotificationStatus>('info')

  const setNotification = (
    message: string,
    status: NotificationStatus
  ): void => {
    setMessage(message)
    setStatus(status)
  }

  return (
    <NotificationContext.Provider
      value={{
        message,
        setMessage,
        status,
        setStatus,
        setNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationContext = (): {
  message: string
  setMessage: (value: string) => void
  status: NotificationStatus
  setStatus: (value: NotificationStatus) => void
  setNotification: (message: string, status: NotificationStatus) => void
} => {
  return useContext(NotificationContext)
}
