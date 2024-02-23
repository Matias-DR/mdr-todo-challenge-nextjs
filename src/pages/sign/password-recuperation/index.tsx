/* eslint-disable @typescript-eslint/no-misused-promises */
import { AComponent, InputComponent } from '@/components'
import { ButtonType, InputType } from '@/components/sign/commons/element-types'
import { serverSideUnsignedVerify } from '@/utils'
import { UnsignedLayout } from '@/layouts'
import { useForm } from 'react-hook-form'

interface FormData {
  email: string
}

export default function PasswordRecuperation (): React.ReactNode {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const _handleSubmit = (formData: FormData): void => {}

  return (
    <UnsignedLayout>
      <div className="flex flex-col items-center">
        <form
          className="w-[85%] sm:w-auto bg-zinc-800 p-8"
          noValidate
          onSubmit={handleSubmit(_handleSubmit)}
        >
          <InputComponent
            id="email"
            label="Email"
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
          <div className="w-full h-14 sm:h-10">
            <div className="w-full h-1">
              <button
                type={ButtonType.SUBMIT}
                className="w-full py-2 px-4 font-bold text-zinc-100 bg-indigo-600 hover:bg-indigo-800 border-b-2 border-e-2 border-indigo-400 active:border-0"
              >
                Enviar correo electrónico de recuperación
              </button>
            </div>
          </div>
        </form>
        <div className="w-1 my-14" />
        <AComponent href="/sign/in" className="mx-auto">
          Volver
        </AComponent>
      </div>
    </UnsignedLayout>
  )
}

export function getServerSideProps (context: {
  req: { headers: { cookie: string } }
}): { props: unknown } | { redirect: { destination: string } } {
  return serverSideUnsignedVerify(context)
}
