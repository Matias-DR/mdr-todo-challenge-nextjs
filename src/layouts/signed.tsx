import type { ReactNode } from 'react';

import { HeaderComponent, NotificationComponent } from '@/components';
import { useNotificationContext } from '@/contexts';

import HomeContextProvider from '@/contexts/home';

interface Props {
  username: string;
  email: string;
  children: ReactNode;
}

export default function SignedLayout({
  username,
  email,
  children,
}: Props): React.ReactNode {
  const { message, setMessage, status } = useNotificationContext();

  return (
    <main className='flex flex-col'>
      <NotificationComponent
        message={message}
        setMessage={setMessage}
        status={status}
      />
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
  );
}
