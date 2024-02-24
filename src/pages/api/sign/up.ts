import type { SignupFormData } from '@/components/sign/up/form';
import type { TaskType } from '@/components/task';
import type { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';

/**
 * Async handler function that sends the signup form data to the external server.
 * Filters the response and sends the appropriate status code and message
 * @arg {NextApiRequest} req
 * @arg {NextApiResponse} res
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const formData = req.body as SignupFormData;
  const url = process.env.BACK_HOST + '/api/user/';
  await axios
    .post(url, formData)
    .then((response: { data: TaskType; status: number }) => {
      res.status(response.status).json(response.data);
    })
    .catch(
      (error: { response: { data: Record<string, string[]>; status: number } }) => {
        let message = '';
        try {
          Object.entries(error.response.data).map(
            (entry: [string, string[]]) =>
              (message = message.concat(entry[1].join('. '))),
          );
        } catch {
          message = 'Ah ocurrido un error inesperado, por favor intente nuevamente.';
        }
        res.status(error.response.status).json({ message });
      },
    );
}
