import type { NextApiRequest, NextApiResponse } from 'next';

import { getCookie } from 'cookies-next';

import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const access = getCookie('access', { req, res });
  const { pair } = req.query as Record<string, string[]>;
  const b64pk = pair[0];
  const token = pair[1];

  if (access !== undefined && access !== null && access.length > 0) {
    res.redirect('/');
    return undefined;
  }

  if (pair !== undefined && pair !== null && pair.length === 2) {
    const isPairValid = await axios.get(
      process.env.BACK_HOST + `/api/reset-password/${b64pk}/${token}`,
    );
    if (isPairValid.status === 200) {
      await axios
        .patch(
          process.env.BACK_HOST + `/api/reset-password/${b64pk}/${token}`,
          req.body,
        )
        .then(() => {
          res.status(200).json({ message: 'Contraseña actualizada' });
        })
        .catch(
          (error: { response: { data: { detail: string }; status: number } }) => {
            res
              .status(error.response.status)
              .json({ message: error.response.data.detail });
          },
        );
    } else {
      res.status(isPairValid.status).json({ message: isPairValid.data.detail });
    }
  } else {
    res.status(400).json({
      message: 'Ah ocurrido un error inesperado, por favor vuelva a intentar.',
    });
  }

  return undefined;
}
