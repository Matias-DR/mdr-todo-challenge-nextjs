import { ButtonType } from '@/commons/element-types'
import { InputComponent } from '@/components'
import { InputType } from '@/commons/element-types'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

import cancel from '@/assets/cancel.svg'
import Image from 'next/image'


type FormData = {
  email: string
  currentPassword: string
  newPassword: string
  newPasswordConfirmation: string
}

export default function ProfileButtonComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    clearErrors
  } = useForm<FormData>()
  const [active, setActive] = useState(false)

  const _handleSubmit = (formData: FormData) => {
    console.log(formData)
  }

  const handleClose = () => {
    setActive(false)
    clearErrors()
  }

  return <div className='inline-block size-9'>
    <button
      className='size-full bg-blue-600 font-bold rounded-full border-2 border-blue-400 hover:bg-blue-500 hover:border-blue-300 active:bg-blue-700 active:border-0'
      onClick={() => setActive(true)}
    >
      M
    </button>
    <div
      className={`${active ? 'absolute' : 'hidden'} z-10 top-0 left-0 size-full flex justify-center items-center bg-zinc-900/75`}
    >
      <form
        className='relative max-w-max p-8 flex flex-col justify-center items-start bg-zinc-800'
        noValidate
        onSubmit={handleSubmit(_handleSubmit)}
      >
        <button
          type={ButtonType.BUTTON}
          onClick={handleClose}
          className='absolute top-0 right-0 flex justify-center items-center pt-2 pe-2 font-bold text-zinc-300'
        >
          <Image
            src={cancel}
            alt='cancel'
            className='size-[1.5rem]'
          />
        </button>
        <h1 className='max-w-[16rem] mb-6 text-xl truncate'>
          Nombredeusuariomuylargoqweewqqwe
        </h1>
        <div className='w-full mb-4'>
          <InputComponent
            id='email'
            type={InputType.EMAIL}
            register={register}
            registerOptions={{
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'El email no es válido'
              }
            }}
            error={errors.email}
            label='Email'
            placeholder='email.example@domain.com'
          />
        </div>
        <div className='w-full mb-4'>
          <InputComponent
            id='currentPassword'
            type={InputType.PASSWORD}
            register={register}
            registerOptions={{
              required: 'La contraseña actual es requerida'
            }}
            error={errors.currentPassword}
            label='Contraseña actual'
          />
        </div>
        <div className='w-full mb-4'>
          <InputComponent
            id='newPassword'
            type={InputType.PASSWORD}
            register={register}
            registerOptions={{}}
            error={errors.newPassword}
            label='Nueva Contraseña'
          />
        </div>
        <div className='w-full mb-4'>
          <InputComponent
            id='newPasswordConfirmation'
            type={InputType.PASSWORD}
            register={register}
            registerOptions={{
              required: watch('newPassword') != '' ? 'La confirmación de la nueva contraseña es requerida' : false,
              validate: value => value === watch('newPassword') || 'Las contraseñas no coinciden'
            }}
            error={errors.newPasswordConfirmation}
            label='Confirmación de nueva contraseña'
          />
        </div>
        <div className='w-full flex justify-center items-center'>
          <div className='w-full h-12 flex justify-center items-center'>
            <button
              type={ButtonType.SUBMIT}
              onClick={() => console.log(errors)}
              className='py-2 px-4 font-bold text-zinc-100 bg-blue-600 hover:bg-blue-800 border-b-2 border-e-2 border-blue-400 active:border-0'
            >
              Actualizar datos
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
}
