import axios from 'axios'

import {
  AComponent,
  InputComponent
} from '@/components'
import {
  ButtonType,
  InputType
} from '@/commons/element-types'
import {
  NotificationStatus,
  useNotificationContext
} from '@/contexts'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import {
  ReactNode,
  useContext
} from 'react'


export type SigninFormData = {
  username: string
  password: string
}

/**
 * Form component for sign in. Allows the user to sign in by sending the form
 * data to the server
 */
export default function SigninFormComponent(): ReactNode {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SigninFormData>()
  const {
    setMessage,
    setStatus
  } = useNotificationContext()
  const router = useRouter()

  /**
   * Calls the endpoint by sending it the form data
   * @arg {SigninFormData} formData
   */
  const _handleSubmit = async (formData: SigninFormData) => {
    await axios.post('/api/sign/in', formData)
      .then(() => router.push('/'))
      .catch((error: any) => {
        setMessage(error.response.data.message)
        setStatus(NotificationStatus.ERROR)
      })
  }

  return <div className='w-fit'>

    {/* Form */}
    <form
      className='bg-zinc-800 px-8 pt-6 pb-8 mb-4'
      noValidate
      onSubmit={handleSubmit(_handleSubmit)}
    >

      {/* Username input */}
      <div className='mb-4'>
        <InputComponent
          id='username'
          label='Nombre de usuario'
          type={InputType.TEXT}
          register={register}
          registerOptions={{
            required: 'El nombre de usuario es requerido'
          }}
          error={errors.username}
        />
      </div>

      {/* Password input */}
      <div className='mb-4'>
        <InputComponent
          id='password'
          label='Contraseña'
          type={InputType.PASSWORD}
          register={register}
          registerOptions={{
            required: 'La contraseña es requerida'
          }}
          error={errors.password}
        />
      </div>

      <div className='
        mb-6
        flex flex-col sm:flex-row
        justify-center items-center gap-2
      '>

        {/* Submit button */}
        <div className='
          w-36 h-12
          flex justify-center items-center
        '>
          <button
            type={ButtonType.SUBMIT}
            className='
              py-2 px-4
              font-bold text-zinc-100
              bg-indigo-600
              border-b-2 border-e-2 border-indigo-400
              hover:bg-indigo-800
              active:border-0
            '
          >
            Iniciar Sesión
          </button>
        </div>

        {/* Divider */}
        <div className='mx-2' />

        {/* Forgot password link */}
        <AComponent
          href='/sign/password-recuperation'
          className='text-sm sm:text-base'
        >
          Ah olvidado su contraseña?
        </AComponent>

      </div>

      {/* Go to signup */}
      <div className='
        w-full
        text-center
        text-zinc-300
      '>
        Aún no se ah registrado? <AComponent
          href='/sign/up'
        >
          Cree una cuenta
        </AComponent>
      </div>
    </form>
  </div>
}
