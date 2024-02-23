import { type InputType } from '@/components/sign/commons/element-types'
import {
  type FieldError,
  type RegisterOptions,
  type UseFormRegister
} from 'react-hook-form'

interface Props {
  id: string
  type: InputType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
  registerOptions?: RegisterOptions
  error?: FieldError
  label?: string
  placeholder?: string
  autoFocus?: boolean
  className?: {
    label?: string
    input?: string
  }
}

export default function InputComponent ({
  id,
  type,
  register,
  registerOptions = {},
  error,
  label,
  placeholder,
  autoFocus = false,
  className
}: Props): React.ReactNode {
  return (
    <>
      {Boolean(label) && (
        <label
          className={`
        block text-zinc-300 text-sm font-bold mb-2 
        ${className?.label}
      `}
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        className={`
            shadow appearance-none border w-full py-2 px-3 text-zinc-700 
            mb-2 focus:outline-none focus:shadow-outline 
            ${className?.input}
          `}
        id={id}
        type={type}
        placeholder={placeholder}
        autoFocus={autoFocus}
        {...(Boolean(register) && register(id, registerOptions))}
      />
      <div className="relative w-full h-[1rem] mb-2">
        {Boolean(error) && (
          <p
            className={`${
              error != null ? 'absolute' : 'hidden'
            } text-red-500 text-xs italic`}
          >
            {error !== undefined ? error.message ?? null : null}
          </p>
        )}
      </div>
    </>
  )
}
