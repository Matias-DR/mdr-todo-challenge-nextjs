import {
  AComponent,
  InputComponent
} from '@/components'
import {
  ButtonType,
  InputType
} from '@/commons/element-types'
import UnsignedLayout from '@/layouts/unsigned.layout'


export default function PasswordRecuperation() {
  return <UnsignedLayout>
    <div className='flex flex-col'>
      <form
        className=''
        noValidate
      >
        <h1 className='mb-2 text-lg'>
          Para recuperar su contraseña, ingrese su email
        </h1>
        <InputComponent
          id='email'
          placeholder='Email'
          type={InputType.EMAIL}
          helper='Por favor complete el campo con un email válido'
        />
        <div className='w-full h-1'>
          <button
            type={ButtonType.SUBMIT}
            className='w-full py-2 px-4 font-bold text-zinc-100 bg-blue-600 hover:bg-blue-800 border-b-2 border-e-2 border-blue-400 active:border-0'
          >
            Enviar correo electrónico	de recuperación
          </button>
        </div>
      </form>
      <div className='w-1 my-14' />
      <AComponent
        href='/sign/in'
        className='mx-auto'
      >
        Volver
      </AComponent>
    </div>
  </UnsignedLayout>
}