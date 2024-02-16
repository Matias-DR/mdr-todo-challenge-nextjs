import { NotificationContextProvider } from '@/contexts'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({
  Component,
  pageProps
}: AppProps) {
  return <NotificationContextProvider>
    <Component {...pageProps} />
  </NotificationContextProvider>
}
