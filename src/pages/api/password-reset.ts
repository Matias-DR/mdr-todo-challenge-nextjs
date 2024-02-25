import type { NextApiRequest, NextApiResponse } from 'next';

import { getCookie } from 'cookies-next';

import axios from 'axios';

export default function handler(req: NextApiRequest, res: NextApiResponse): void {
  const access = getCookie('access', { req, res });
  const config = { headers: { Authorization: `Bearer ${access}` } };

  axios
    .post(process.env.BACK_HOST + '/api/reset-password/', req.body, config)
    .then(() => {
      res.status(200).json({ message: 'Email enviado' });
    })
    .catch((error: { response: { data: { message: string }; status: number } }) => {
      res
        .status(error.response.status)
        .json({ message: error.response.data.message });
    });

  return undefined;
}
