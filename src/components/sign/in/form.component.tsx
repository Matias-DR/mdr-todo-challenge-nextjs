import {
  AComponent,
  InputComponent
} from '@/components'
import {
  ButtonType,
  InputType
} from '@/commons/element-types'
import { useForm } from 'react-hook-form'


type FormData = {
  username: string
  password: string
}

export default function SigninFormComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const _handleSubmit = (formData: any) => {
    console.log(formData)
  }

  return <div className='w-fit'>
    <form
      className='bg-zinc-800 px-8 pt-6 pb-8 mb-4'
      noValidate
      onSubmit={handleSubmit(_handleSubmit)}
    >
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
      <div className='mb-8'>
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
      <div className='flex items-center mb-6'>
        <div className='w-36 h-12 flex justify-center items-center'>
          <button
            type={ButtonType.SUBMIT}
            onClick={() => console.log(errors)}
            className='py-2 px-4 font-bold text-zinc-100 bg-blue-600 hover:bg-blue-800 border-b-2 border-e-2 border-blue-400 active:border-0'
          >
            Iniciar Sesión
          </button>
        </div>
        <div className='mx-2' />
        <AComponent
          href='/sign/password-recuperation'
          className='text-sm sm:text-base'
        >
          Ah olvidado su contraseña?
        </AComponent>
      </div>
      <div className='w-full text-center text-zinc-300'>
        Aún no se ah registrado? <AComponent
          href='/sign/up'
        >
          Cree una cuenta
        </AComponent>
      </div>
    </form>
  </div>
}
