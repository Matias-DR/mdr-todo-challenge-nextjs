import type { NextApiRequest, NextApiResponse } from 'next';

import { AComponent, InputComponent } from '@/components';
import { ButtonType, InputType } from '@/components/sign/commons/element-types';
import { useNotificationContext } from '@/contexts';
import { UnsignedLayout } from '@/layouts';
import { serverSideUnsignedVerify } from '@/utils';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';

import axios from 'axios';
import { useRouter } from 'next/router';

interface Props {
  b64pk: string;
  token: string;
}

interface FormData {
  newPassword: string;
  newPasswordConfirmation: string;
}

export default function RestPassword({ b64pk, token }: Props): ReactNode {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();
  const { setNotification } = useNotificationContext();
  const router = useRouter();

  const _handleSubmit = (formData: FormData): void => {
    axios
      .post(`/api/reset-password/${b64pk}/${token}`, formData)
      .then((res: { data: { message: string } }): void => {
        setNotification(res.data.message, 'info');
        router.replace('sign/in');
      })
      .catch((error: { response: { data: { message: string } } }) => {
        setNotification(error.response.data.message, 'error');
      });
  };

  return (
    <UnsignedLayout>
      <div className='size-full flex flex-col items-center'>
        <h1 className='w-full mb-4 text-center'>Recuperación de la contraseña</h1>
        <form
          className='w-[25rem] max-w-[100%] mb-4 p-8 bg-zinc-800'
          noValidate
          onSubmit={handleSubmit(_handleSubmit)}
        >
          <div className='mb-4'>
            <InputComponent
              id='newPassword'
              label='Nueva contraseña'
              type={InputType.PASSWORD}
              register={register}
              registerOptions={{
                required: 'Campo requerido',
                pattern: {
                  value: /^(?=.*.)(?=.*\d).{8,}$/,
                  message:
                    'La contraseña debe tener al menos 8 caracteres, una letra y un número',
                },
              }}
              error={errors.newPassword}
            />
          </div>
          <div className='mb-4'>
            <InputComponent
              id='newPasswordConfirmation'
              label='Confirmación'
              type={InputType.PASSWORD}
              register={register}
              registerOptions={{
                required: 'Campo requerido',
                validate: (value) =>
                  value === watch('newPassword') || 'Las contraseñas no coinciden',
              }}
              error={errors.newPasswordConfirmation}
            />
          </div>
          <div className='w-full h-14 sm:h-10'>
            <div className='w-full h-1'>
              <button
                type={ButtonType.SUBMIT}
                className='w-full py-2 px-4 font-bold text-zinc-100 bg-indigo-600 hover:bg-indigo-800 border-b-2 border-e-2 border-indigo-400 active:border-0'
              >
                Cambiar la contraseña
              </button>
            </div>
          </div>
        </form>
        <AComponent
          href='/sign/in'
          className='mx-auto'
        >
          Cancelar
        </AComponent>
      </div>
    </UnsignedLayout>
  );
}

interface ServerProps {
  req: NextApiRequest;
  res: NextApiResponse;
  query: Record<string, string[]>;
}

export function getServerSideProps({ req, res, query }: ServerProps) {
  const signedVerify = serverSideUnsignedVerify(req, res);
  if (!Object.hasOwn(signedVerify, 'redirect')) {
    const pair = query.pair;
    if (pair !== undefined && pair !== null && pair.length === 2) {
      return { props: { b64pk: pair[0], token: pair[1] } };
    }
  }
  return { redirect: { destination: 'sign/in' } };
}
