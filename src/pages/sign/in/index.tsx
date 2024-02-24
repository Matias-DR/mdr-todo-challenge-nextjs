import type { NextApiRequest, NextApiResponse } from 'next';
import type { Redirect, Props } from '@/utils/server-side-unsigned-verify';

import { SigninFormComponent } from '@/components/sign';
import { UnsignedLayout } from '@/layouts';
import { serverSideUnsignedVerify } from '@/utils';

export default function SigninPage(): React.ReactNode {
  return (
    <UnsignedLayout>
      <SigninFormComponent />
    </UnsignedLayout>
  );
}

export function getServerSideProps({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}): Redirect | Props {
  return serverSideUnsignedVerify(req, res);
}
