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
  email: string
  password: string
  passwordConfirmation: string
}

export default function SignupFormComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
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
          type={InputType.TEXT}
          register={register}
          registerOptions={{
            required: 'El nombre de usuario es requerido'
          }}
          error={errors.username}
          label='Nombre de usuario'
        />
      </div>
      <div className='mb-4'>
        <InputComponent
          id='email'
          type={InputType.EMAIL}
          register={register}
          registerOptions={{
            required: 'El email es requerido',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'El email no es válido'
            }
          }}
          error={errors.email}
          label='Email'
        />
      </div>
      <div className='mb-4'>
        <InputComponent
          id='password'
          type={InputType.PASSWORD}
          register={register}
          registerOptions={{
            required: 'La contraseña es requerida',
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message: 'La contraseña debe tener al menos 8 caracteres, una letra y un número'
            }
          }}
          error={errors.password}
          label='Contraseña'
        />
      </div>
      <div className='mb-8'>
        <InputComponent
          id='passwordConfirmation'
          type={InputType.PASSWORD}
          register={register}
          registerOptions={{
            required: 'La confirmación de la contraseña es requerida',
            validate: value => value === watch('password') || 'Las contraseñas no coinciden'
          }}
          error={errors.passwordConfirmation}
          label='Confirmar contraseña'
        />
      </div>
      <div className='flex justify-center items-center mb-6'>
        <div className='w-36 h-12 flex justify-center items-center'>
          <button
            type={ButtonType.SUBMIT}
            onClick={() => console.log(errors)}
            className='py-2 px-4 font-bold text-zinc-100 bg-blue-600 hover:bg-blue-800 border-b-2 border-e-2 border-blue-400 active:border-0'
          >
            Crear cuenta
          </button>
        </div>
      </div>
      <div className='w-full text-center text-zinc-300'>
        Ya se ah registrado? <AComponent
          href='/sign/in'
        >
          Inicie sesión
        </AComponent>
      </div>
    </form>
  </div>
}
