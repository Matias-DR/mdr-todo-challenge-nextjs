import {
  AComponent,
  InputComponent
} from '@/components'
import {
  ButtonType,
  InputType
} from '@/commons/element-types'
import { serverSideUnsignedVerify } from '@/utils'
import { UnsignedLayout } from '@/layouts'
import { useForm } from 'react-hook-form'


type FormData = {
  email: string
}


export default function PasswordRecuperation() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const _handleSubmit = (formData: any) => {
    console.log(formData)
  }

  return <UnsignedLayout>
    <div className='flex flex-col items-center'>
      <form
        className='w-[85%] sm:w-auto bg-zinc-800 p-8'
        noValidate
        onSubmit={handleSubmit(_handleSubmit)}
      >
        <InputComponent
          id='email'
          label='Email'
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
        />
        <div className='w-full h-14 sm:h-10'>
          <div className='w-full h-1'>
            <button
              type={ButtonType.SUBMIT}
              className='w-full py-2 px-4 font-bold text-zinc-100 bg-blue-600 hover:bg-blue-800 border-b-2 border-e-2 border-blue-400 active:border-0'
            >
              Enviar correo electrónico de recuperación
            </button>
          </div>
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

export async function getServerSideProps(context: any) {
  return serverSideUnsignedVerify(context)
}
