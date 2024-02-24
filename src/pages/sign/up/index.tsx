import type { NextApiRequest, NextApiResponse } from 'next';
import type { Redirect, Props } from '@/utils/server-side-unsigned-verify';

import { SignupFormComponent } from '@/components/sign';
import { UnsignedLayout } from '@/layouts';
import { serverSideUnsignedVerify } from '@/utils';

export default function SignupPage(): React.ReactNode {
  return (
    <UnsignedLayout>
      <SignupFormComponent />
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
