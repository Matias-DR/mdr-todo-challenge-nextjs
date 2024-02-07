import {
  AComponent,
  InputComponent
} from '@/components'
import {
  ButtonType,
  InputType
} from '@/commons/element-types'


export default function SignupFormComponent() {
  return <div className='w-fit'>
    <form
      className='bg-zinc-800 shadow-md px-8 pt-6 pb-8 mb-4'
      noValidate
    >
      <div className='mb-4'>
        <InputComponent
          id='username'
          label='Nombre de usuario'
          type={InputType.TEXT}
          helper=''
        />
      </div>
      <div className='mb-4'>
        <InputComponent
          id='email'
          label='Email'
          type={InputType.EMAIL}
          helper=''
        />
      </div>
      <div className='mb-4'>
        <InputComponent
          id='password'
          label='Contraseña'
          type={InputType.PASSWORD}
          helper=''
        />
      </div>
      <div className='mb-8'>
        <InputComponent
          id='password'
          label='Confirmar contraseña'
          type={InputType.PASSWORD}
          helper=''
        />
      </div>
      <div className='flex justify-center items-center mb-6'>
        <div className='w-36 h-12 flex justify-center items-center'>
          <button
            type={ButtonType.SUBMIT}
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