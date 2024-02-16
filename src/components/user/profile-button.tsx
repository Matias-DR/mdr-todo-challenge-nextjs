import axios from 'axios'
import cancel from '@/assets/cancel.svg'
import Image from 'next/image'

import { ButtonType } from '@/commons/element-types'
import { InputComponent } from '@/components'
import { InputType } from '@/commons/element-types'
import { NotificationStatus } from '@/contexts'
import {
  useHomeContext,
  useNotificationContext
} from '@/contexts'
import { useForm } from 'react-hook-form'
import {
  type ReactNode,
  useState
} from 'react'
import { useRouter } from 'next/router'


/**
 * @arg {string} email - Email of the user
 * @arg {string} currentPassword - Current password of the user
 * @arg {string} newPassword - New password of the user
 * @arg {string} newPasswordConfirmation - New password confirmation of the user
 */
export type UpdateFormData = {
  email: string
  currentPassword: string
  newPassword: string
  newPasswordConfirmation: string
}

/**
 * Profile button component to show the user profile and update it. It also
 * allows the user to sign out.
 */
export default function ProfileButtonComponent(): ReactNode {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    clearErrors
  } = useForm<UpdateFormData>()
  const router = useRouter()
  const [active, setActive] = useState(false)
  const { username, email } = useHomeContext()
  const { setMessage, setStatus } = useNotificationContext()

  /**
   * Closes the modal and clears the errors in the form
   */
  const handleClose = () => {
    setActive(false)
    clearErrors()
  }

  /**
   * Sends the form data to the endpoint to update the user profile
   * @arg {UpdateFormData} formData - Form data to be submitted
   */
  const _handleSubmit = (formData: UpdateFormData) => {
    axios.patch('/api/user', formData)
      .then(() => { })
      .catch((error: any) => {
        setMessage(error.response.data.message)
        setStatus(NotificationStatus.ERROR)
      })
  }

  /**
   * Calls the endpoint of signout to signs out the user
   */
  const hangleSignout = () => {
    axios.post('/api/sign/out')
      .then(() => router.replace('/sign/in'))
      .catch((error: any) => {
        setMessage(error.response.data.message)
        setStatus(NotificationStatus.ERROR)
      })
  }

  return <div className='
    size-9
    inline-block
  '>

    {/* Profile button */}
    <button
      onClick={() => setActive(true)}
      className='
        size-full
        font-bold
        bg-indigo-600
        border-2
        border-indigo-400
        rounded-full
        hover:bg-indigo-500 hover:border-indigo-300
        active:bg-indigo-700 active:border-0
      '
    >
      {username.charAt(0).toUpperCase()}
    </button>

    {/* Profile modal */}
    <div className={`
      ${active ? 'absolute' : 'hidden'} z-10 top-0 left-0
      size-full
      flex justify-center items-center
      bg-zinc-900/75
    `}>

      <div className='
        relative
        max-w-max
        px-8 py-4
        flex flex-col justify-center items-start
        bg-zinc-800
      '>

        {/* Close modal button */}
        <button
          type={ButtonType.BUTTON}
          onClick={handleClose}
          className='
            absolute
            top-0 right-0
            flex justify-center items-center
            pt-2 pe-2
            font-bold
            text-zinc-300
          '
        >
          <Image
            src={cancel}
            alt='cancel'
            className='size-[1.5rem]'
          />
        </button>

        {/* Username title */}
        <h1 className='
          max-w-[16rem]
          px-4
          text-xl
          truncate
        '>
          {username}
        </h1>

        {/* Form */}
        <form
          noValidate
          onSubmit={handleSubmit(_handleSubmit)}
          className='
            relative
            max-w-max
            p-4
            flex flex-col justify-center items-start
            bg-zinc-800
          '
        >

          {/* Email input */}
          <div className='
            w-full
            mb-2
          '>
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
              placeholder={email}
            />
          </div>

          {/* Current password input */}
          <div className='
            w-full
            mb-2
          '>
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

          {/* New password input */}
          <div className='
            w-full
            mb-2
          '>
            <InputComponent
              id='newPassword'
              type={InputType.PASSWORD}
              register={register}
              registerOptions={{
                pattern: {
                  value: /^(?=.*.)(?=.*\d).{8,}$/,
                  message: 'La contraseña debe tener al menos 8 caracteres, una letra y un número'
                }
              }}
              error={errors.newPassword}
              label='Nueva Contraseña'
            />
          </div>

          {/* New password confirmation input */}
          <div className='
            w-full
            mb-8 sm:mb-0
          '>
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

          <div className='
            w-full h-14
            mb-4 sm:mb-0
            flex flex-col sm:flex-row place-content-evenly items-center gap-4
          '>

            {/* Submit button */}
            <div className='
              w-44 h-12
              flex justify-center items-center
            '>
              <button
                type={ButtonType.SUBMIT}
                className='
                    min-w-40
                    py-2 px-4
                    font-bold
                    text-zinc-100
                    bg-indigo-600
                    border-b-2 border-e-2
                    border-indigo-400
                    hover:bg-indigo-800
                    active:border-0
                  '
              >
                Actualizar datos
              </button>
            </div>

            {/* Signout button */}
            <div className='
                w-36 h-12
                flex justify-center items-center
              '>
              <button
                type={ButtonType.BUTTON}
                onClick={hangleSignout}
                className='
                  py-2 px-4
                  font-bold
                  text-zinc-100
                  bg-indigo-600
                  border-b-2 border-e-2
                  border-indigo-400
                  hover:bg-indigo-800
                  active:border-0
                '
              >
                Cerrar Sesión
              </button>
            </div>

          </div>

        </form>

      </div>

    </div>
  </div>
}
