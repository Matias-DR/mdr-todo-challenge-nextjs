import type { NextApiRequest, NextApiResponse } from 'next';

import { getCookie } from 'cookies-next';
import { extractUserFromToken } from '@/utils';
import { TaskSetComponent } from '@/components/task';

import SignedLayout from '@/layouts/signed';

interface Props {
  username: string;
  email: string;
}

export default function Home({ username, email }: Props): React.ReactNode {
  return (
    <SignedLayout
      username={username}
      email={email}
    >
      <div className='w-full flex-grow p-2'>
        <TaskSetComponent />
      </div>
    </SignedLayout>
  );
}

interface ReturnRedirect {
  redirect: { destination: string };
}

interface ReturnProps {
  props: { username: string; email: string };
}

export function getServerSideProps({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}): ReturnRedirect | ReturnProps {
  const access = getCookie('access', { req, res }) as string;
  const user = extractUserFromToken(access);
  if (user === undefined || user === null) {
    return { redirect: { destination: `${process.env.FRONT_HOST}/sign/in` } };
  } else {
    return {
      props: {
        username: user.username,
        email: user.email,
      },
    };
  }
}
