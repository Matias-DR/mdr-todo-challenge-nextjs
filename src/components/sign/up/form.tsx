import { AComponent, InputComponent } from '@/components';
import { ButtonType, InputType } from '@/components/sign/commons/element-types';
import { useNotificationContext } from '@/contexts';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import axios from 'axios';

export interface SignupFormData {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

/**
 * Form component for sign up. Allows the user to sign up by sending the form
 * data to the server
 */
export default function SignupFormComponent(): React.ReactNode {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupFormData>();
  const { setNotification } = useNotificationContext();
  const router = useRouter();

  /**
   * Calls the endpoint by sending it the form data
   * @arg {SignupFormData} formData
   */
  const _handleSubmit = async (formData: SignupFormData): Promise<void> => {
    await axios
      .post('/api/sign/up', formData)
      .then(async () => await router.push('/sign/in'))
      .catch((error: { response: { data: { message: string } } }) => {
        setNotification(error.response.data.message, 'error');
      });
  };

  return (
    <div className='w-fit'>
      {/* Form */}
      <form
        noValidate
        onSubmit={handleSubmit(_handleSubmit)}
        className='
        mb-4 px-8 pt-6 pb-8
        bg-zinc-800
      '
      >
        {/* Username field */}
        <div className='mb-4'>
          <InputComponent
            id='username'
            type={InputType.TEXT}
            register={register}
            registerOptions={{
              required: 'El nombre de usuario es requerido',
            }}
            error={errors.username}
            label='Nombre de usuario'
          />
        </div>

        {/* Email field */}
        <div className='mb-4'>
          <InputComponent
            id='email'
            type={InputType.EMAIL}
            register={register}
            registerOptions={{
              required: 'El email es requerido',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'El email no es válido',
              },
            }}
            error={errors.email}
            label='Email'
          />
        </div>

        {/* Password field */}
        <div className='mb-4'>
          <InputComponent
            id='password'
            type={InputType.PASSWORD}
            register={register}
            registerOptions={{
              required: 'La contraseña es requerida',
              pattern: {
                value: /^(?=.*.)(?=.*\d).{8,}$/,
                message:
                  'La contraseña debe tener al menos 8 caracteres, una letra y un número',
              },
            }}
            error={errors.password}
            label='Contraseña'
          />
        </div>

        {/* Passwrod confirmation field */}
        <div className='mb-8'>
          <InputComponent
            id='passwordConfirmation'
            type={InputType.PASSWORD}
            register={register}
            registerOptions={{
              required: 'La confirmación de la contraseña es requerida',
              validate: (value) =>
                value === watch('password') || 'Las contraseñas no coinciden',
            }}
            error={errors.passwordConfirmation}
            label='Confirmar contraseña'
          />
        </div>

        {/* Submit button */}
        <div
          className='
        mb-6
        flex justify-center items-center
      '
        >
          <div
            className='
          w-36 h-12
          flex justify-center items-center
        '
          >
            <button
              type={ButtonType.SUBMIT}
              className='
              py-2 px-4
              font-bold text-zinc-100
              bg-indigo-600
              border-b-2 border-e-2
              border-indigo-400
              hover:bg-indigo-800
              active:border-0
            '
            >
              Crear cuenta
            </button>
          </div>
        </div>

        {/* Go to signin */}
        <div
          className='
        w-full
        text-center text-zinc-300
      '
        >
          ¿Ya se ha registrado? <AComponent href='/sign/in'>Inicie sesión</AComponent>
        </div>
      </form>
    </div>
  );
}
